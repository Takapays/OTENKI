#!/usr/bin/env python3
"""One-shot Instagram carousel Job; dry-run unless explicitly asked to publish."""
from __future__ import annotations
import argparse
import json
import os
import urllib.parse
import urllib.request


def log(event, **fields):
    print(json.dumps({'event': event, **fields}, ensure_ascii=False), flush=True)


def image_probe(url, site):
    expected = urllib.parse.urlsplit(site)
    actual = urllib.parse.urlsplit(url)
    if (expected.scheme != 'https' or actual.scheme != 'https' or
            actual.netloc != expected.netloc or not actual.path.startswith('/api/instagram/carousel-static/')):
        raise RuntimeError('Unexpected carousel image origin/path')
    req = urllib.request.Request(url, headers={'Accept': 'image/png,image/jpeg'})
    with urllib.request.urlopen(req, timeout=180) as response:
        if urllib.parse.urlsplit(response.geturl()).netloc != expected.netloc:
            raise RuntimeError('Unexpected image redirect')
        header = response.read(8)
        if response.status != 200 or not (header == b'\x89PNG\r\n\x1a\n' or header.startswith(b'\xff\xd8\xff')):
            raise RuntimeError('Image endpoint did not return a valid image')


def run(api, *, publish=False, probe=image_probe, site=None):
    site = (site or os.environ.get('INSTAGRAM_SITE_URL', '')).rstrip('/')
    if not site or not api._national_supabase_enabled():
        log('configuration-failed', siteConfigured=bool(site), supabaseConfigured=api._national_supabase_enabled())
        return 1
    target = api._national_nextday_date_text()
    account = api._instagram_direct_account_probe()
    log('account-probe', ok=bool(account.get('ok')), httpStatus=account.get('httpStatus'), username=account.get('username'))
    if not account.get('ok'):
        return 1
    week = api._instagram_load_week_100_results(target)
    counts = {d: len(rows) for d, rows in week.items()}
    log('carousel-cache', date=target, counts=counts)
    # Use the existing saved-data policy. Never fetch weather providers from this Job.
    if len(week) != 7 or target not in week or any(n < 100 for n in counts.values()):
        log('cache-incomplete', requiredPerDay=100)
        return 1
    urls = list(api.instagram_bot.carousel_image_urls(target))
    if len(urls) != api.instagram_bot.CAROUSEL_PAGE_COUNT or not urls:
        log('image-urls-incomplete', pages=len(urls))
        return 1
    # Validate origin/path for all images, then fetch one signed image from the web service.
    expected = urllib.parse.urlsplit(site)
    for url in urls:
        actual = urllib.parse.urlsplit(url)
        if actual.scheme != 'https' or actual.netloc != expected.netloc or not actual.path.startswith('/api/instagram/carousel-static/'):
            log('image-origin-mismatch')
            return 1
    probe(urls[0], site)
    log('image-probe', ok=True, pages=len(urls))
    if not publish:
        log('preflight-complete', published=False)
        return 0
    # Reuse the working manual/stateless publish path and its remote deduplication.
    result = api._instagram_post_with_lock(target, week[target], force=False,
        load_carousel_results=api._instagram_carousel_result_loader(target, week))
    ok = bool(result.get('ok')) and result.get('reason') not in {'auto-post-disabled', 'posting-in-progress'}
    log('publish-result', date=target, ok=ok, skipped=bool(result.get('skipped')))
    return 0 if ok else 1


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--publish', action='store_true', help='Actually publish; without it only run preflight')
    args = parser.parse_args()
    missing = [k for k in ('INSTAGRAM_ACCESS_TOKEN','INSTAGRAM_USER_ID','INSTAGRAM_SITE_URL','INSTAGRAM_IMAGE_SECRET') if not os.environ.get(k, '').strip()]
    if missing:
        log('missing-environment', names=missing)
        return 1
    os.environ['NATIONAL_OUTLOOK_AUTO_REFRESH'] = '0'
    os.environ['INSTAGRAM_AUTO_POST'] = '0'
    os.environ['INSTAGRAM_AUTO_MEDIA'] = 'carousel'
    import server
    return run(server, publish=args.publish)


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as exc:
        # Never log signed URLs, raw Graph responses, or secret values.
        log('job-failed', errorType=type(exc).__name__, httpStatus=getattr(exc, 'code', None))
        raise SystemExit(1)
