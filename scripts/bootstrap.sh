#!/bin/bash
#
# AI Project Guide - Bootstrap Script
#
# Quick setup for any project using ai-project-guide.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/ecorkran/ai-project-guide/main/scripts/bootstrap.sh | bash
#
# Or download and run:
#   curl -fsSL https://raw.githubusercontent.com/ecorkran/ai-project-guide/main/scripts/bootstrap.sh -o bootstrap.sh
#   chmod +x bootstrap.sh
#   ./bootstrap.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    local icon="$1"
    local message="$2"
    local color="${3:-$NC}"
    echo -e "${color}${icon} ${message}${NC}"
}

print_error() {
    print_status "❌" "$1" "$RED"
}

print_success() {
    print_status "✅" "$1" "$GREEN"
}

print_info() {
    print_status "💡" "$1" "$BLUE"
}

print_warning() {
    print_status "⚠️" "$1" "$YELLOW"
}

# Check prerequisites
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in a git repository
if ! git rev-parse --git-dir &> /dev/null; then
    print_warning "Not a git repository. Initializing..."
    git init
    print_success "Initialized git repository"
fi

print_info "Setting up AI Project Guide..." "$BLUE"
echo ""

# Check if already set up
if [ -d "project-documents/ai-project-guide" ]; then
    print_warning "AI Project Guide submodule already exists!"
    echo ""
    print_info "To update, run:" "$BLUE"
    echo "  git submodule update --remote project-documents/ai-project-guide"
    echo ""
    print_info "Or if you have the Python script:" "$BLUE"
    echo "  python3 project-documents/ai-project-guide/scripts/setup-project-guides.py --update"
    exit 0
fi

# Create directory structure
print_info "Creating directory structure..." "$BLUE"
mkdir -p project-documents/private/{architecture,slices,tasks,features,reviews,analysis}

# Create .gitkeep
echo "# Keep private/ in version control" > project-documents/private/.gitkeep

print_success "Created project-documents/private/ subdirectories"
echo ""

# Add git submodule
print_info "Adding ai-project-guide as git submodule..." "$BLUE"

if git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide 2>/dev/null; then
    print_success "Submodule added successfully!"
    echo ""

    print_success "🎉 Setup complete!" "$GREEN"
    echo ""

    print_info "Next steps:" "$BLUE"
    echo "  1. Commit the changes:"
    echo "       git add ."
    echo "       git commit -m 'Add ai-project-guide'"
    echo ""
    echo "  2. To update guides later:"
    echo "       git submodule update --remote project-documents/ai-project-guide"
    echo ""
    echo "  3. Start using the framework:"
    echo "       • Review: project-documents/ai-project-guide/readme.md"
    echo "       • Process: project-documents/ai-project-guide/project-guides/guide.ai-project.000-process.md"
    echo "       • Your work goes in: project-documents/private/"
    echo ""
else
    print_error "Failed to add submodule. This might happen if:"
    echo "  • You don't have internet connection"
    echo "  • GitHub is unreachable"
    echo "  • The submodule already exists"
    echo ""
    print_info "Try manual setup:" "$BLUE"
    echo "  git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide"
    exit 1
fi
