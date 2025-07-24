#!/usr/bin/env bash
set -e

# Where public guides live in the monorepo
LOCAL_GUIDES="../../project-documents"

# Where we want them in the project
TARGET="project-documents"

echo "Setting up project guides..."

mkdir -p "$TARGET"

if [ -d "$LOCAL_GUIDES" ]; then
  # Monorepo user: copy from local project-documents directory
  echo "📚 Copying guides from monorepo (project-documents/)..."
  rsync -a "$LOCAL_GUIDES/" "$TARGET/"
  
  # For monorepo, also copy development artifacts
  if [ -d "../../project-artifacts/nextjs-template" ]; then
    echo "📦 Copying development artifacts for monorepo work..."
    rsync -a "../../project-artifacts/nextjs-template/" "examples/our-project/"
    echo "✅ Development artifacts copied"
  fi
  echo "✅ Guides copied from monorepo"
  
  # Enable project-documents for version control (safe to run multiple times)
  node scripts/enable-project-docs.js
else
  # Stand-alone user: fetch from GitHub (flattened structure)
  echo "📚 Fetching guides from GitHub (flattened structure)..."
  rm -rf tmp  # Clean up any previous runs
  git clone --depth 1 https://github.com/ecorkran/ai-project-guide.git tmp &&
    rsync -a --exclude='.git' tmp/ "$TARGET/" &&
    rm -rf tmp
    
  # Create basic private structure for standalone users
  echo "📁 Setting up project structure for standalone use..."
  mkdir -p "project-documents/private"
  mkdir -p "project-documents/private/code-reviews"
  mkdir -p "project-documents/private/maintenance"
  mkdir -p "project-documents/private/project-guides"
  mkdir -p "project-documents/private/tasks"
  mkdir -p "project-documents/private/ui/screenshots"
  echo "# Project Private Documents

This directory is for your project-specific documents, tasks, code reviews, and maintenance items." > "project-documents/private/README.md"
  echo "✅ Guides fetched from GitHub"
  
  # Enable project-documents for version control (safe to run multiple times)
  node scripts/enable-project-docs.js
fi

echo "Project guides setup complete!"
echo "- Guides available in: $TARGET/"
if [ -d "$LOCAL_GUIDES" ]; then
  echo "- Project workspace: examples/our-project/ (monorepo template development)"
else
  echo "- Project workspace: project-documents/private/ (standalone project)"
fi
