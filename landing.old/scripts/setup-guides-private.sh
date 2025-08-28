#!/usr/bin/env bash
set -e

# Where private guides should live
TARGET="project-documents/private"

mkdir -p "$TARGET"

# Check if we're in a monorepo with access to private guides
LOCAL_PRIVATE="../../project-documents/private"

if [ -d "$LOCAL_PRIVATE" ]; then
  # Monorepo user: copy from local private guides
  echo "🔒 Copying private guides from monorepo..."
  rsync -a --delete "$LOCAL_PRIVATE/" "$TARGET/"
  echo "✅ Private guides copied from monorepo"
else
  # Stand-alone user: fetch from private repository
  echo "🔒 Fetching private guides from repository..."
  # Note: Update this URL to your private guides repository
  git clone --depth 1 git@github.com:ecorkran/ai-project-guides-private.git tmp &&
    rsync -a --delete --exclude='.git' tmp/ "$TARGET/" &&
    rm -rf tmp
  echo "✅ Private guides fetched from repository"
fi
