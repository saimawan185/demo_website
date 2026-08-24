#!/bin/bash
set -e
cd "/Users/apple/Documents/Website Projects/Dentalogix"
git add -A
git commit -m "Replace demo with Dental House Johar Town website." || true
git push origin main
git log -1 --oneline
echo "Live: https://saimawan185.github.io/demo_website/"
