#!/usr/bin/env bash
set -e

REMOTE_NAME=ai-guides
REMOTE_URL=git@github.com:ecorkran/ai-project-guide.git
BRANCH=public-only
PREFIX=guides/public

# Add the SSH remote once
if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

# Fetch the latest from your private guides repo
git fetch "$REMOTE_NAME"

# If this is the first run, add the subtree; otherwise pull updates
if [ ! -d "$PREFIX" ]; then
  git subtree add --prefix "$PREFIX" "$REMOTE_NAME" "$BRANCH" --squash
else
  git subtree pull --prefix "$PREFIX" "$REMOTE_NAME" "$BRANCH" --squash
fi
