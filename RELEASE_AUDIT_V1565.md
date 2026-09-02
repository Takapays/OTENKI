# V1.5.65 Release Audit

## Scope
全国分析の4時間共有キャッシュの部分充足対策。CT・座標・アクセス・個別詳細予報ロジックは変更していない。

## Verification
- node --check app.js: PASS
- python -m py_compile server.py: PASS
- audit_version_consistency.py: PASS (1.5.65)
- custom route integrity: 11,560 shown ordered pairs / missing 0 / estimated 0
- area network: 424/424 verified direct / missing 0
- Hyakumeizan network: 700/700 verified direct / missing 0
- ZIP: changed-files only

## Cache behavior
- TTL: 4 hours (unchanged)
- worker interval: 15 minutes (unchanged)
- rolling cache: next 7 days / 100 Famous Mountains (unchanged)
- refresh block size: 25 mountains (new)
- successful blocks are persisted immediately (new)
- incomplete dates remain due and are prioritized on following cycles (new)
- initial UI shows cache coverage as obtained/eligible (new)

## Limitation
実稼働Supabaseの現在行数そのものは、このローカル監査では確認していない。デプロイ後は /api/health の national_last_refresh_report.dateReports で freshAfter / remainingDueAfter / chunks を確認できる。
