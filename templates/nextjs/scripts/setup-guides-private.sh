#!/usr/bin/env bash
set -e

TMP="tmp-guides"

# Load .env file if it exists
if [ -f ".env" ]; then
  echo "📄 Loading configuration from .env file..."
  export $(cat .env | grep -v '^#' | xargs)
fi

# Make sure public docs are already in place
# (you've already run setup-guides.sh)

# Check for private guides repository URL
PRIVATE_GUIDES_URL="${PRIVATE_GUIDES_URL:-}"
if [ -z "$PRIVATE_GUIDES_URL" ]; then
  echo "ℹ️  No PRIVATE_GUIDES_URL environment variable set"
  echo "   Organization private guides are an advanced feature"
  echo "   Set PRIVATE_GUIDES_URL in your .env file or environment"
  echo "   Example: PRIVATE_GUIDES_URL=git@github.com:your-org/private-guides.git"
  exit 0
fi

# Clone your private repo (fail silently if not available)
if git clone --depth 1 "$PRIVATE_GUIDES_URL" "$TMP" 2>/dev/null; then
  echo "🔒 Copying organization private guides..."
  
  # Create private directory if it doesn't exist
  mkdir -p project-documents/private
  
  # **Overlay** private docs **without deleting** public ones
  rsync -a --exclude='.git' "$TMP/" project-documents/private/
  
  echo "✅ Organization private guides copied"
else
  echo "⚠️  Could not clone private guides from: $PRIVATE_GUIDES_URL"
  echo "   Check your repository URL and SSH access"
fi

# Cleanup
rm -rf "$TMP" 2>/dev/null || true
