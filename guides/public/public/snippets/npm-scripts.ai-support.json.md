

```json
"scripts": {
    "setup-guides": "mkdir -p project-documents && rsync -a --delete ../../guides/public/ ./project-documents",
    "setup-guides:private": "mkdir -p project-documents && git clone --depth 1 git@github.com:ecorkran/ai-project-guides.git tmp-guides && rsync -a --delete tmp-guides/private/ ./project-documents && rm -rf tmp-guides && pnpm run setup-guides", 
    "guides": "pnpm run setup-guides"
  }
```
