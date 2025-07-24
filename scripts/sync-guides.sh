#!/usr/bin/env bash
set -e

REMOTE_NAME=ai-guides
REMOTE_URL=git@github.com:ecorkran/ai-project-guide.git
BRANCH=main
PREFIX=project-documents

# Add the SSH remote once
if ! git remote get-url "$REMOTE_NAME" >/dev/null 2>&1; then
  git remote add "$REMOTE_NAME" "$REMOTE_URL"
fi

# Fetch the latest from your private guides repo
git fetch "$REMOTE_NAME"

# Check if this is already a git subtree by looking for subtree merge commits
if git log --grep="git-subtree-dir: $PREFIX" --oneline | grep -q "git-subtree-dir: $PREFIX" 2>/dev/null; then
  # This is an existing subtree, pull updates
  echo "📚 Updating existing git subtree..."
  git subtree pull --prefix "$PREFIX" "$REMOTE_NAME" "$BRANCH" --squash
else
  # Not a subtree yet - need to add it
  echo "📚 Setting up git subtree for guides..."
  if [ -d "$PREFIX" ]; then
    # Directory exists but isn't a subtree - back it up and remove
    echo "⚠️  Backing up existing $PREFIX directory..."
    mv "$PREFIX" "${PREFIX}.backup.$(date +%s)"
    # Stage the deletions so working tree is clean
    git add "$PREFIX"
    git commit -m "Remove old $PREFIX content before setting up git subtree"
  fi
  git subtree add --prefix "$PREFIX" "$REMOTE_NAME" "$BRANCH" --squash
fi

echo "✅ Project guides synchronized successfully"
