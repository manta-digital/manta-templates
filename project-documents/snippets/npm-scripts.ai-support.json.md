

```json
"scripts": {
    "setup-guides": "mkdir -p project-documents/private/{analysis,architecture,features,project-guides,reviews,slices,tasks} && git submodule add https://github.com/ecorkran/ai-project-guide.git project-documents/ai-project-guide && echo '# Keep private/ in version control' > project-documents/private/.gitkeep || echo 'Submodule already exists—run npm run update-guides to update.'",
    "update-guides": "git submodule update --remote project-documents/ai-project-guide",
    "setup-cursor": "project-documents/ai-project-guide/scripts/setup-ide cursor",
    "setup-windsurf": "project-documents/ai-project-guide/scripts/setup-ide windsurf",
    "setup-claude": "project-documents/ai-project-guide/scripts/setup-ide claude"
  }
```
