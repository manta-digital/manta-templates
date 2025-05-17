## Guides Setup

### Inside ai-project-guide
##### Make sure you're on the latest main
```sh
git checkout main
git pull

# Create a branch that contains ONLY the public/ subtree
git subtree split --prefix=public -b public-only

# Push that branch up
git push origin public-only
```

### inside manta-templates
```sh
git remote add ai-guides git@github.com:ecorkran/ai-project-guide.git
git fetch ai-guides

git subtree add --prefix guides/public ai-guides main --squash
git commit -m "docs: import public guides from ai-project-guides"
```

When source repo is updated (automate this):
```sh
git fetch ai-guides
git subtree pull --prefix guides/public ai-guides main --squash
git commit -m "docs: sync public guides"
```

This needs to go into package.json, and we need to automate it.
```json
"srcipts": {
  "setup-guides:private": "git clone --depth 1 git@github.com:ecorkran/ai-project-guides.git tmp-guides && rsync -a --delete tmp-guides/private/ ./project-documents && rm -rf tmp-guides && pnpm setup-guides"
}
```
