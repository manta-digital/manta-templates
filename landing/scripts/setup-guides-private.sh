#!/usr/bin/env bash
set -e

TMP="tmp-guides"

# Make sure public docs are already in place
# (you’ve already run setup-guides.sh)

# Clone your private repo
git clone --depth 1 git@github.com:ecorkran/ai-project-guide.git "$TMP"

# **Overlay** private docs **without deleting** public ones**
rsync -a "$TMP/private/" project-documents/

# Cleanup
rm -rf "$TMP"
