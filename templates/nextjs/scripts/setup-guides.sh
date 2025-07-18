#!/usr/bin/env bash
set -e

# Where public guides live in the monorepo
LOCAL_GUIDES="../../guides/public"

# Where we want them in the project
TARGET="project-documents"

echo "Setting up project guides..."

mkdir -p "$TARGET"

if [ -d "$LOCAL_GUIDES" ]; then
  # Monorepo user: copy from local guides/public directory
  echo "📚 Copying guides from monorepo (guides/public/)..."
  rsync -a --delete "$LOCAL_GUIDES/" "$TARGET/"
  
  # For monorepo, also copy development artifacts
  if [ -d "../../project-artifacts/nextjs-template" ]; then
    echo "📦 Copying development artifacts for monorepo work..."
    rsync -a "../../project-artifacts/nextjs-template/" "examples/our-project/"
    echo "✅ Development artifacts copied"
  fi
  echo "✅ Guides copied from monorepo"
else
  # Stand-alone user: fetch from GitHub (flattened structure)
  echo "📚 Fetching guides from GitHub (flattened structure)..."
  git clone --depth 1 https://github.com/mantaray-ar/ai-project-guides.git tmp &&
    rsync -a --delete tmp/ "$TARGET/" &&
    rm -rf tmp
    
  # Create basic our-project structure for standalone users
  echo "📁 Setting up project structure for standalone use..."
  mkdir -p "examples/our-project"
  echo "# Project Documents

This directory is for your project-specific documents and tasks." > "examples/our-project/README.md"
  echo "✅ Guides fetched from GitHub"
fi

echo "Project guides setup complete!"
echo "- Guides available in: $TARGET/"
echo "- Project workspace: examples/our-project/"
