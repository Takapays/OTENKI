#!/bin/sh
set -eu
python -m pip install -r requirements-reel-v1587.txt
python -m playwright install chromium
