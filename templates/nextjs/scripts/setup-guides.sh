#!/usr/bin/env bash
set -e

# Where public guides live in the monorepo
LOCAL_GUIDES="../../guides/public"

# Where we want them in the project
TARGET="project-documents"

mkdir -p "$TARGET"

if [ -d "$LOCAL_GUIDES" ]; then
  # Monorepo user: copy from local
  rsync -a --delete "$LOCAL_GUIDES/" "$TARGET/"
else
  # Stand-alone user: fetch from GitHub
  git clone --depth 1 https://github.com/manta-digital/manta-templates.git tmp &&
    rsync -a --delete tmp/guides/public/ "$TARGET/" &&
    rm -rf tmp
fi
