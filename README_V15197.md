# Traten V1.5.197

## Reel memory hardening
- x264 encoding limited to one thread.
- ultrafast preset + still-image tuning.
- disabled B-frames and lookahead buffers.
- lowered AAC bitrate to 128 kbps.
- explicit GC before/after ffmpeg.
- added Render RSS log markers: instagram_reel_start / instagram_reel_done.

## Render setting strongly recommended
The existing Start Command has been observed with Gunicorn 2 workers / 4 threads. On a small-memory Render instance, change it to one worker and two threads while Reel generation is enabled:

`gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 2 --timeout 180 server:app`

This avoids duplicating the whole Python application in two worker processes.
