#!/usr/bin/env python3
"""
AI Project Guide - Setup Script for Non-NPM Projects

This script sets up the ai-project-guide as a git submodule in your project.
Works for Python, Go, Rust, or any non-NPM project.

Usage:
    python3 setup-project-guides.py [--update]

Options:
    --update    Update existing submodule instead of creating new one
"""

import subprocess
import sys
from pathlib import Path


def run_command(cmd, check=True, capture_output=False):
    """Run a shell command and handle errors."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            check=check,
            capture_output=capture_output,
            text=True
        )
        return result
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running command: {cmd}")
        print(f"   {e.stderr if capture_output else e}")
        return None


def print_status(icon, message, color_code=None):
    """Print colored status message."""
    if color_code:
        print(f"\033[{color_code}m{icon} {message}\033[0m")
    else:
        print(f"{icon} {message}")


def setup_guides():
    """Set up ai-project-guide as a git submodule."""
    print_status("🚀", "Setting up AI Project Guide...", "0;34")
    print()

    # Get project root (current directory)
    project_root = Path.cwd()
    project_docs = project_root / "project-documents"
    private_dir = project_docs / "private"
    submodule_dir = project_docs / "ai-project-guide"

    # Check if already set up
    if submodule_dir.exists():
        print_status("⚠️", "Submodule already exists at project-documents/ai-project-guide", "1;33")
        print_status("💡", "Use --update flag to update the submodule", "0;34")
        return False

    # Create directory structure
    print_status("📁", "Creating directory structure...", "0;34")

    subdirs = [
        "analysis",
        "architecture",
        "features",
        "project-guides",
        "reviews",
        "slices",
        "tasks"
    ]

    for subdir in subdirs:
        dir_path = private_dir / subdir
        dir_path.mkdir(parents=True, exist_ok=True)
        print_status("✅", f"Created {dir_path.relative_to(project_root)}", "0;32")

    # Create .gitkeep in private/ directory
    gitkeep = private_dir / ".gitkeep"
    gitkeep.write_text("# Keep private/ in version control\n")
    print_status("✅", "Created project-documents/private/.gitkeep", "0;32")

    print()

    # Add git submodule
    print_status("📦", "Adding ai-project-guide as git submodule...", "0;34")

    result = run_command(
        "git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide",
        capture_output=True
    )

    if result and result.returncode == 0:
        print_status("✅", "Submodule added successfully!", "0;32")
        print()
        print_status("🎉", "Setup complete!", "0;32")
        print()
        print_status("💡", "Next steps:", "0;34")
        print("   • Run: git commit -m 'Add ai-project-guide'")
        print("   • Update guides: python3 project-documents/ai-project-guide/scripts/setup-project-guides.py --update")
        print("   • Or use: git submodule update --remote project-documents/ai-project-guide")
        print()
        return True
    else:
        print_status("❌", "Failed to add submodule", "0;31")
        return False


def update_guides():
    """Update existing ai-project-guide submodule."""
    print_status("🔄", "Updating AI Project Guide...", "0;34")
    print()

    submodule_dir = Path.cwd() / "project-documents" / "ai-project-guide"

    # Check if submodule exists
    if not submodule_dir.exists():
        print_status("❌", "Submodule not found at project-documents/ai-project-guide", "0;31")
        print_status("💡", "Run without --update flag to set up for the first time", "0;34")
        return False

    # Update submodule
    result = run_command(
        "git submodule update --remote project-documents/ai-project-guide",
        capture_output=True
    )

    if result and result.returncode == 0:
        print_status("✅", "Submodule updated successfully!", "0;32")
        print()

        # Show what changed if anything
        status_result = run_command(
            "git status --short project-documents/ai-project-guide",
            capture_output=True
        )

        if status_result and status_result.stdout.strip():
            print_status("📝", "Changes detected:", "0;34")
            print(status_result.stdout)
            print_status("💡", "Commit the update with: git commit -am 'Update ai-project-guide'", "0;34")
        else:
            print_status("✅", "Already up to date!", "0;32")

        print()
        return True
    else:
        print_status("❌", "Failed to update submodule", "0;31")
        return False


def main():
    """Main entry point."""
    # Check if git is available
    result = run_command("git --version", check=False, capture_output=True)
    if not result or result.returncode != 0:
        print_status("❌", "Git is not installed or not in PATH", "0;31")
        sys.exit(1)

    # Check if we're in a git repository
    result = run_command("git rev-parse --git-dir", check=False, capture_output=True)
    if not result or result.returncode != 0:
        print_status("❌", "Not a git repository. Run 'git init' first.", "0;31")
        sys.exit(1)

    # Parse arguments
    if "--update" in sys.argv:
        success = update_guides()
    else:
        success = setup_guides()

    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
