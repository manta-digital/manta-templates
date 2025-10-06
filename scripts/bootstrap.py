#!/usr/bin/env python3
"""
AI Project Guide - Bootstrap Script

Quick setup for any project using ai-project-guide.

Usage:
    curl -fsSL https://raw.githubusercontent.com/ecorkran/ai-project-guide/main/scripts/bootstrap.py | python3

Or download and run:
    curl -fsSL https://raw.githubusercontent.com/ecorkran/ai-project-guide/main/scripts/bootstrap.py -o bootstrap.py
    python3 bootstrap.py
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
        return None


def print_status(icon, message, color_code=None):
    """Print colored status message."""
    if color_code:
        print(f"\033[{color_code}m{icon} {message}\033[0m")
    else:
        print(f"{icon} {message}")


def main():
    """Bootstrap AI Project Guide setup."""
    import os

    # Check git is available
    result = run_command("git --version", check=False, capture_output=True)
    if not result or result.returncode != 0:
        print_status("❌", "Git is not installed. Please install git first.", "0;31")
        sys.exit(1)

    # Check if we're in a git repository
    result = run_command("git rev-parse --git-dir", check=False, capture_output=True)
    if not result or result.returncode != 0:
        print_status("❌", "Not in a git repository", "0;31")
        print()
        print("Please run this from your project root and ensure it's a git repository:")
        print("  cd /path/to/your/project")
        print("  git init")
        print("  python3 scripts/setup-guides.py")
        sys.exit(1)

    # Navigate to git repository root
    result = run_command("git rev-parse --show-toplevel", check=False, capture_output=True)
    if result and result.returncode == 0:
        git_root = result.stdout.strip()
        current_dir = os.getcwd()
        if current_dir != git_root:
            print_status("💡", "Navigating to git repository root...", "0;34")
            os.chdir(git_root)
            print_status("✅", f"Working directory: {git_root}", "0;32")

    print_status("💡", "Setting up AI Project Guide...", "0;34")
    print()

    # Check if already set up
    if Path("project-documents/ai-project-guide").exists():
        print_status("⚠️", "AI Project Guide submodule already exists!", "1;33")
        print()
        print_status("💡", "To update, run:", "0;34")
        print("  git submodule update --remote project-documents/ai-project-guide")
        print()
        print_status("💡", "Or if you have the Python script:", "0;34")
        print("  python3 project-documents/ai-project-guide/scripts/setup-project-guides.py --update")
        return

    # Create directory structure
    print_status("💡", "Creating directory structure...", "0;34")

    subdirs = [
        "analysis",
        "architecture",
        "features",
        "project-guides",
        "reviews",
        "slices",
        "tasks"
    ]

    private_dir = Path("project-documents/private")
    for subdir in subdirs:
        dir_path = private_dir / subdir
        dir_path.mkdir(parents=True, exist_ok=True)

    # Create .gitkeep
    gitkeep = private_dir / ".gitkeep"
    gitkeep.write_text("# Keep private/ in version control\n")

    print_status("✅", "Created project-documents/private/ subdirectories", "0;32")
    print()

    # Add git submodule
    print_status("💡", "Adding ai-project-guide as git submodule...", "0;34")

    result = run_command(
        "git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide",
        check=False,
        capture_output=True
    )

    if result and result.returncode == 0:
        print_status("✅", "Submodule added successfully!", "0;32")
        print()
        print_status("🎉", "Setup complete!", "0;32")
        print()
        print_status("💡", "Next steps:", "0;34")
        print("  1. Commit the changes:")
        print("       git add .")
        print("       git commit -m 'Add ai-project-guide'")
        print()
        print("  2. To update guides later:")
        print("       git submodule update --remote project-documents/ai-project-guide")
        print()
        print("  3. Start using the framework:")
        print("       • Review: project-documents/ai-project-guide/readme.md")
        print("       • Process: project-documents/ai-project-guide/project-guides/guide.ai-project.000-process.md")
        print("       • Your work goes in: project-documents/private/")
        print()
    else:
        print_status("❌", "Failed to add submodule. This might happen if:", "0;31")
        print("  • You don't have internet connection")
        print("  • GitHub is unreachable")
        print("  • The submodule already exists")
        print()
        print_status("💡", "Try manual setup:", "0;34")
        print("  git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide")
        sys.exit(1)


if __name__ == "__main__":
    main()
