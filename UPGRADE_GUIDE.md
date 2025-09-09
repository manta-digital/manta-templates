# Template Upgrade Guide

This guide helps you upgrade existing manta-template deployments to newer versions.

## Quick Upgrade (Automated)

```bash
# From manta-templates repository
node scripts/upgrade-template.js electron /path/to/your/app
```

## Manual Upgrade Steps

### 1. Update Dependencies
```bash
# In your deployed app directory
pnpm add @radix-ui/react-tabs@^1.1.13 @radix-ui/react-tooltip@^1.2.8
```

### 2. Update Components
```bash
# Copy latest ui-core components
cp -r /path/to/manta-templates/packages/src/lib/ui-core/* src/lib/ui-core/
```

### 3. Test Build
```bash
pnpm build
```

### 4. Optional: Add Forms Demo Route
Add to your router configuration:
```jsx
<Route path="/forms-demo" element={<FormsDemo />} />
```

## Version-Specific Upgrades

### 0.8.1 → Current
- **New Dependencies:** @radix-ui/react-tabs, @radix-ui/react-tooltip
- **New Components:** Complete forms system (Input, Checkbox, Select, etc.)
- **New Features:** Tabs, Lists, Tables components
- **Theme Updates:** CosineTerrainCard now theme-aware

## Troubleshooting

### Build Errors After Upgrade
1. Clear node_modules: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
2. Check TypeScript errors: `pnpm tsc --noEmit`
3. Verify all dependencies installed: `pnpm ls @radix-ui/react-tabs`

### Missing Components
- Ensure packages/ components were copied correctly
- Check import paths in your components
- Verify ui-core styles are imported

## Future-Proofing

Consider implementing:
1. **Version tracking** in package.json (`"mantaTemplateVersion": "0.8.3"`)
2. **Automated upgrade checks** in CI/CD pipeline
3. **Component testing** after upgrades

## Need Help?

Check the [CHANGELOG.md](./CHANGELOG.md) for version-specific changes or create an issue for upgrade assistance.