# App Configuration

## App Protocol Scheme

**IMPORTANT**: You MUST change `APP_PROTOCOL_SCHEME` in `app-protocol.ts` when deploying your app!

### Why?

Multiple Electron apps on the same system cannot share the same protocol scheme. If two apps use `app://`, macOS will route protocol requests to whichever app registered first, causing conflicts.

### What to Change

In `app-protocol.ts`, change:

```typescript
export const APP_PROTOCOL_SCHEME = 'electron-template-app'
```

To your app's unique name:

```typescript
export const APP_PROTOCOL_SCHEME = 'your-app-name'
```

### Examples

- ✅ `'context-forge'`
- ✅ `'my-company-app'`
- ✅ `'invoice-manager'`
- ❌ `'app'` (too generic, will conflict)
- ❌ `'electron-template-app'` (used by template)

### Testing

After changing, verify it works:
1. Run `pnpm dev`
2. App should load normally
3. Check console - no protocol errors

### Auth Protocol

If using Auth0 (Pro tier), also change `AUTH_PROTOCOL_SCHEME` in `auth/auth0-config.ts` to match your app name with `-auth` suffix:

```typescript
export const AUTH_PROTOCOL_SCHEME = 'your-app-name-auth'
```
