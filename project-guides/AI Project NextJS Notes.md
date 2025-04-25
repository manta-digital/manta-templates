This document contains additional notes and tips that may be used as-is or inserted into created project documents.

##### NextJS Setup NonEmpty
```markdown
Note that you may need to copy project-documents as the project root will usually not be empty initially. Fine to do this and copy them back. If .windsurfrules being present causes issue, delete it, then copy coderules.md to /project-root/.windsurfrules after initializing the NextJS setup.

Important Points:
1. The NextJS app should be created at the project root.
2. Don't forget to put the project-documents folder back.
```

##### NextJS App Initialization
```
CI=true npx create-next-app@latest nextjs-ai-lab \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --turbo \
  --src-dir \
  --use-npm \
  --import-alias "@/*"
```

