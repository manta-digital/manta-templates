#!/usr/bin/env bash
set -e

# Load .env file if it exists
if [ -f ".env" ]; then
  echo "📄 Loading configuration from .env file..."
  export $(cat .env | grep -v '^#' | xargs)
fi

echo "🔄 Updating project guides..."

# Check for project-documents/private/ before updating
if [ ! -d "project-documents/private" ]; then
  echo "⚠️  Warning: No project-documents/private/ found"
  echo "   Consider moving custom content there before updating"
  echo "   This ensures your project-specific guides are preserved"
  read -p "Continue anyway? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Update cancelled"
    exit 1
  fi
fi

# Update public guides (safe to overwrite)
echo "📚 Updating public guides..."
rm -rf tmp  # Clean up any previous runs
git clone --depth 1 https://github.com/ecorkran/ai-project-guide.git tmp &&
  rsync -a --delete --exclude='private/' tmp/ project-documents/ &&
  rm -rf tmp

# Update organization private guides (if available, overlay carefully)
echo "🔒 Checking for organization private guides..."
PRIVATE_GUIDES_URL="${PRIVATE_GUIDES_URL:-}"
if [ -n "$PRIVATE_GUIDES_URL" ]; then
  if git clone --depth 1 "$PRIVATE_GUIDES_URL" tmp-private 2>/dev/null; then
    echo "📚 Updating organization private guides..."
    
    # Create private directory if it doesn't exist
    mkdir -p project-documents/private
    
    # Overlay organization guides (project guides win in conflicts)
    echo "📚 Merging organization guides with project files..."
    
    # Copy files one by one, skip if they already exist (project files win)
    find tmp-private -type f | while read src_file; do
      # Get the relative path
      rel_path="${src_file#tmp-private/}"
      dest_file="project-documents/private/$rel_path"
      
      # Only copy if destination doesn't exist (project files win)
      if [ ! -f "$dest_file" ]; then
        # Create directory if needed
        mkdir -p "$(dirname "$dest_file")"
        cp "$src_file" "$dest_file"
      fi
    done
    
    echo "✅ Organization private guides updated"
    rm -rf tmp-private
  else
    echo "⚠️  Could not clone private guides from: $PRIVATE_GUIDES_URL"
    echo "   Check your repository URL and SSH access"
  fi
else
  echo "ℹ️  No PRIVATE_GUIDES_URL environment variable set"
  echo "   Organization private guides are an advanced feature"
  echo "   Set PRIVATE_GUIDES_URL in your .env file or environment"
fi

# Re-enable project-documents for version control
node scripts/enable-project-docs.js

echo "✅ Project guides updated successfully!"
echo "   Your project-documents/private/ content has been preserved" 