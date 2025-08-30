#!/bin/bash

# Version Sync Script for Manta Templates Monorepo
# Synchronizes versions across all packages and creates proper git tags

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
MONOREPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CURRENT_VERSION=""
NEW_VERSION=""

# Package paths - using arrays for macOS bash compatibility
PACKAGE_NAMES=("ui-core" "ui-adapters-nextjs" "template-nextjs" "landing")
PACKAGE_PATHS=("packages/ui-core/package.json" "packages/ui-adapters/nextjs/package.json" "templates/nextjs/package.json" "landing/package.json")

# Functions
print_header() {
  echo -e "${BLUE}=== Manta Templates Version Sync ===${NC}"
  echo ""
}

get_current_version() {
  if git describe --tags --abbrev=0 >/dev/null 2>&1; then
    CURRENT_VERSION=$(git describe --tags --abbrev=0 | sed 's/^v//')
    echo -e "${GREEN}Current version: ${CURRENT_VERSION}${NC}"
  else
    echo -e "${YELLOW}No existing version tags found${NC}"
    CURRENT_VERSION="0.0.0"
  fi
}

show_package_versions() {
  echo -e "\n${BLUE}Current package versions:${NC}"
  for i in "${!PACKAGE_NAMES[@]}"; do
    local name="${PACKAGE_NAMES[$i]}"
    local package_file="${PACKAGE_PATHS[$i]}"
    if [[ -f "$package_file" ]]; then
      local version=$(grep '"version"' "$package_file" | sed 's/.*"version": *"\([^"]*\)".*/\1/')
      echo -e "  ${name}: ${version}"
    else
      echo -e "  ${RED}${name}: package.json not found${NC}"
    fi
  done
}

update_package_version() {
  local package_file="$1"
  local new_version="$2"
  local name="$3"
  
  if [[ -f "$package_file" ]]; then
    # Update version in package.json using a more robust approach
    if command -v jq >/dev/null 2>&1; then
      # Use jq if available
      jq --arg version "$new_version" '.version = $version' "$package_file" > "$package_file.tmp" && mv "$package_file.tmp" "$package_file"
    else
      # Fallback to sed
      sed -i.bak "s/\"version\": *\"[^\"]*\"/\"version\": \"$new_version\"/" "$package_file"
      rm "$package_file.bak"
    fi
    echo -e "  ${GREEN}✓ Updated ${name} to v${new_version}${NC}"
  else
    echo -e "  ${RED}✗ ${package_file} not found${NC}"
  fi
}

update_all_versions() {
  local version="$1"
  echo -e "\n${BLUE}Updating all packages to v${version}...${NC}"
  
  for i in "${!PACKAGE_NAMES[@]}"; do
    local name="${PACKAGE_NAMES[$i]}"
    local package_file="${PACKAGE_PATHS[$i]}"
    update_package_version "$package_file" "$version" "$name"
  done
}

create_git_tags() {
  local version="$1"
  echo -e "\n${BLUE}Creating git tags...${NC}"
  
  # Main version tag
  git tag "v${version}" -m "Release v${version}"
  echo -e "  ${GREEN}✓ Created main tag: v${version}${NC}"
  
  # Package-specific tags
  git tag "v${version}-packages" -m "All packages at v${version}"
  echo -e "  ${GREEN}✓ Created packages tag: v${version}-packages${NC}"
  
  git tag "v${version}-template-nextjs" -m "NextJS template v${version}"
  echo -e "  ${GREEN}✓ Created template tag: v${version}-template-nextjs${NC}"
}

show_usage() {
  echo "Usage: $0 [OPTIONS] <new-version>"
  echo ""
  echo "Options:"
  echo "  -c, --check     Show current versions without updating"
  echo "  -h, --help      Show this help message"
  echo ""
  echo "Examples:"
  echo "  $0 --check                    # Show current versions"
  echo "  $0 0.8.0                      # Update to v0.8.0"
  echo "  $0 1.0.0                      # Update to v1.0.0"
}

# Main script
main() {
  cd "$MONOREPO_ROOT"
  print_header
  get_current_version
  show_package_versions
  
  case "${1:-}" in
    -c|--check)
      echo -e "\n${GREEN}Version check complete.${NC}"
      exit 0
      ;;
    -h|--help)
      show_usage
      exit 0
      ;;
    "")
      echo -e "\n${RED}Error: Version number required${NC}"
      show_usage
      exit 1
      ;;
    *)
      NEW_VERSION="$1"
      ;;
  esac
  
  # Validate version format (basic semver check)
  if [[ ! "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo -e "\n${RED}Error: Version must be in semver format (x.y.z)${NC}"
    exit 1
  fi
  
  echo -e "\n${YELLOW}Updating to version: ${NEW_VERSION}${NC}"
  read -p "Continue? (y/N): " -n 1 -r
  echo
  
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Operation cancelled${NC}"
    exit 0
  fi
  
  update_all_versions "$NEW_VERSION"
  
  echo -e "\n${YELLOW}Create git tags? (y/N): ${NC}"
  read -p "" -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    create_git_tags "$NEW_VERSION"
    echo -e "\n${BLUE}To push tags to remote:${NC}"
    echo -e "  git push origin v${NEW_VERSION}"
    echo -e "  git push origin v${NEW_VERSION}-packages"
    echo -e "  git push origin v${NEW_VERSION}-template-nextjs"
  fi
  
  echo -e "\n${GREEN}Version sync complete! 🎉${NC}"
}

# Run main function with all arguments
main "$@"