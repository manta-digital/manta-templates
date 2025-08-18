

```json
"scripts": {
    "setup-guides": "git remote get-url ai-project-guide > /dev/null 2>&1 || git remote add ai-project-guide git@github.com:ecorkran/ai-project-guide.git && git fetch ai-project-guide && git subtree add --prefix project-documents ai-project-guide main --squash || echo 'Subtree already exists—run npm run guides to update.'",
    "guides": "git fetch ai-project-guide && git subtree pull --prefix project-documents ai-project-guide main --squash",
    "setup-cursor": "project-documents/scripts/setup-ide cursor",
    "setup-windsurf": "project-documents/scripts/setup-ide windsurf"
  }
