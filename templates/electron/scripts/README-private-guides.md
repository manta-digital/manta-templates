# Organization Private Guides Configuration

## Overview

The template supports organization-specific private guides that can be layered on top of the public guides. This is an advanced feature for teams with internal knowledge repositories.

## Setup

### 1. Configure Private Guides Repository

**Option A: .env file (Recommended)**
```bash
# Copy the example file
cp env.example .env

# Edit .env and add your repository URL
PRIVATE_GUIDES_URL=git@github.com:your-org/private-guides.git
```

**Option B: Environment variable**
```bash
export PRIVATE_GUIDES_URL=git@github.com:your-org/private-guides.git
```

### 2. Use Private Guides

```bash
# Setup guides with organization private guides
pnpm setup-guides:private

# Update guides (includes organization updates)
pnpm update-guides
```

## Repository Structure

Your private guides repository should follow the same structure as the public guides:

```
your-private-guides/
├── project-guides/     # Organization-specific processes
├── tool-guides/        # Internal tool knowledge
├── framework-guides/   # Company framework standards
├── domain-guides/      # Domain-specific knowledge
└── snippets/           # Internal code snippets
```

## Behavior

- **Overlay**: Private guides overlay on top of public guides
- **Project wins**: If a file exists in both private and project guides, project version is preserved
- **Fail silently**: If no private repository is configured, scripts continue normally

## Example .env file

```bash
# .env
PRIVATE_GUIDES_URL=git@github.com:your-org/private-guides.git
```

## Security

- Use SSH keys for repository access
- Ensure your private repository is properly secured
- Consider using GitHub Apps or deploy keys for automated access
- The .env file should be added to .gitignore to keep your repository URL private 