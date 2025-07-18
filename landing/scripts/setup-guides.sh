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
  rsync -a "$LOCAL_GUIDES/" "$TARGET/"
  echo "✅ Guides copied from monorepo"
else
  # Stand-alone user: fetch from GitHub (flattened structure)
  echo "📚 Fetching guides from GitHub (flattened structure)..."
  rm -rf tmp  # Clean up any previous runs
  git clone --depth 1 https://github.com/ecorkran/ai-project-guide.git tmp &&
    rsync -a tmp/ "$TARGET/" &&
    rm -rf tmp
  echo "✅ Guides fetched from GitHub"
fi
