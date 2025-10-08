#!/usr/bin/env bash
set -e

# AI Project Guide - Monorepo Sync Script
# Updates the ai-project-guide submodule to latest version

SUBMODULE_PATH="project-documents/ai-project-guide"
REMOTE_URL="git@github.com:ecorkran/ai-project-guide.git"
BRANCH="main"

echo "🔄 Syncing AI Project Guide in monorepo..."
echo ""

# Check if submodule exists
if [ -d "$SUBMODULE_PATH/.git" ] || [ -f "$SUBMODULE_PATH/.git" ]; then
    # Submodule already exists - update it
    echo "📚 Updating existing submodule at $SUBMODULE_PATH..."
    git submodule update --remote "$SUBMODULE_PATH"
    
    cd "$SUBMODULE_PATH"
    git checkout "$BRANCH"
    git pull origin "$BRANCH"
    cd - > /dev/null

    # Show what changed
    LATEST_COMMIT=$(git log -1 --oneline)
    echo ""
    echo "✅ Updated to: $LATEST_COMMIT"
    cd - > /dev/null
    
else
    # Check if we have old subtree content
    if [ -d "$SUBMODULE_PATH" ]; then
        echo "⚠️  Found existing project-documents/ directory (likely old subtree)"
        echo "   This needs manual migration. Please:"
        echo ""
        echo "   1. Backup your project-documents/:"
        echo "      cp -r project-documents project-documents.backup"
        echo ""
        echo "   2. Remove old subtree:"
        echo "      git rm -r project-documents"
        echo "      git commit -m 'Remove old subtree before adding submodule'"
        echo ""
        echo "   3. Add as submodule:"
        echo "      git submodule add $REMOTE_URL $SUBMODULE_PATH"
        echo "      git commit -m 'Add ai-project-guide as submodule'"
        echo ""
        exit 1
    fi
    
    # No submodule and no directory - add fresh submodule
    echo "📦 Adding ai-project-guide as submodule..."
    git submodule add "$REMOTE_URL" "$SUBMODULE_PATH"
    git submodule update --init --recursive
    echo ""
    echo "✅ Submodule added successfully"
fi

echo ""
echo "✅ Project guides synchronized successfully"
echo ""
echo "💡 Template development notes:"
echo "   - Guides are now in: $SUBMODULE_PATH/"
echo "   - Templates reference same path as standalone projects"
echo "   - No special monorepo handling needed!"