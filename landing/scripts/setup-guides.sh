#!/usr/bin/env bash
set -e

# Where public guides live in the monorepo
LOCAL_GUIDES="../../project-documents"

# Where we want them in the project
TARGET="project-documents"

mkdir -p "$TARGET"

if [ -d "$LOCAL_GUIDES" ]; then
  # Monorepo user: copy from local project-documents directory
  echo "📚 Copying guides from monorepo (project-documents/)..."
  rsync -a --delete "$LOCAL_GUIDES/" "$TARGET/"
  echo "✅ Guides copied from monorepo"
else
  # Stand-alone user: fetch from GitHub (flattened structure)
  echo "📚 Fetching guides from GitHub (flattened structure)..."
  git clone --depth 1 https://github.com/mantaray-ar/ai-project-guides.git tmp &&
    rsync -a --delete tmp/ "$TARGET/" &&
    rm -rf tmp
  echo "✅ Guides fetched from GitHub"
fi
