---
docType: developer-guide  
platform: electron  
audience: [ai, human]  
skill-level: advanced (Auth0 beginners)  
goal: Enable robust Auth0 integration in Electron (React+Vite)  
references:  
  - [Auth0: Securing Electron Apps](https://auth0.com/blog/securing-electron-applications-with-openid-connect-and-oauth-2/)  
  - [OAuth 2.0 Security Best Practices (RFC 9700)](https://workos.com/blog/oauth-best-practices)  
  - [Google OAuth Best Practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)  
  - [Unosquare: Adding Auth0 to Electron](https://www.unosquare.com/blog/how-to-add-auth0-to-an-electron-app/)  
  - [Auth0 Security Best Practices](https://deepstrike.io/blog/auth0-security-best-practices)  
***

# Guide: Auth0 Integration for Electron Apps  
### (React + Vite, 2025 Edition)

## Overview

Integrating Auth0 for authentication in Electron apps demands secure architecture, strict adherence to OAuth 2.0 best practices, and vigilance against native app pitfalls, especially when using React+Vite as your front end[1][2][3][4][5].

## Prerequisites

- Node.js ≥ 18, Electron v28+, Vite 4+, React 18+
- Access to Auth0 dashboard (register app as “Native”)
- Familiarity with Electron’s security model, context isolation, IPC, and system APIs

## Recommended Architecture

- **Auth flow logic lives in Electron main process**: React/UI renderer only receives login status/token fetch via secure IPC[1][2].
- **Use PKCE-compliant Authorization Code Flow** with Auth0
- **Open OAuth URLs in system browser** (`shell.openExternal`) not embedded webviews[3].
- **Capture redirects via custom URI scheme or loopback** local server[1][2].
- **Store tokens in OS keychain** (e.g. via Keytar) — never localStorage or files[5].

## Implementation Steps

1. **Configure Auth0 Application**  
   - Set type: Native app  
   - Registered URIs: custom schema (e.g., `myapp://callback`) or loopback (`http://localhost:PORT`)  
2. **Initiate login**  
   - Use Electron’s `shell.openExternal` to launch the system browser for OAuth[3].
3. **Handle redirect/callback**  
   - For URI schemes: Electron listens for incoming URI callback[4].  
   - For loopback: Local HTTP server awaits callback (secure against CSRF)[1].
4. **Exchange authorization code for tokens using PKCE**  
   - Store securely and access via preload/main process IPC only[5].
5. **Expose authentication events/state to renderer through contextBridge**  
   - Never send raw tokens to the renderer[1].
6. **Handle logout, token expiration, and refresh securely**  
   - Use Auth0’s endpoints, properly destroy credentials from keychain

## Best Practices Checklist

- Always use PKCE in Authorization Code flow (never Implicit flow)
- Never use embedded webviews, only external browser
- Always implement secure context isolation and use preload+contextBridge for IPC
- Store tokens in protected OS keychain storage
- Validate and sanitize all redirect URIs
- Handle token expiry/revocation proactively, UX for re-authentication
- Apply strict CSPs and review Electron security checklist

## Common Pitfalls & Avoidance

| Pitfall                                   | Avoidance Method                                  |
|--------------------------------------------|---------------------------------------------------|
| Using webview/BrowserWindow for login      | Always use `shell.openExternal` with PKCE         |
| Storing tokens in localStorage/filesystem  | Use OS keychain APIs, e.g. Keytar                 |
| Exposing tokens to renderer process        | Broker via contextBridge, never direct exposure   |
| Race conditions with redirect/loopback     | Validate port, run one-time local server, monitor callback correctly |
| Not handling token expiration/revocation   | Implement robust refresh/logout flows             |
| Weak IPC, context isolation off            | Always enable context isolation, restrict IPC to known channels |

## Example: Minimal IPC Auth Bridge

```ts
// preload.ts
import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('auth', {
  login: () => ipcRenderer.invoke('login'),
  logout: () => ipcRenderer.invoke('logout'),
  getToken: () => ipcRenderer.invoke('get-token'),
  onAuthChange: (cb) => ipcRenderer.on('auth-change', cb)
});
```

## Offline Flow
It is important to consider the case where user launches the app offline.  Use the UnoSquare guide specifically for this:
https://www.unosquare.com/blog/how-to-add-auth0-to-an-electron-app/



## References

- [Auth0: Securing Electron Apps](https://auth0.com/blog/securing-electron-applications-with-openid-connect-and-oauth-2/)
- [OAuth 2.0 Security Best Practices (RFC 9700)](https://workos.com/blog/oauth-best-practices)
- [Google OAuth Best Practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)
- [Unosquare: Adding Auth0 to Electron](https://www.unosquare.com/blog/how-to-add-auth0-to-an-electron-app/)
- [Auth0 Security Best Practices](https://deepstrike.io/blog/auth0-security-best-practices)

***

This guide ensures that developers build robust, secure Auth0 integration for modern Electron apps, mitigating pitfalls with proven design, secure token storage, and vigilant IPC boundaries[1][4][2][5][3].

Sources
[1] Build and Secure an Electron App - OpenID, OAuth, Node.js ... - Auth0 https://auth0.com/blog/securing-electron-applications-with-openid-connect-and-oauth-2/
[2] OAuth best practices: We read RFC 9700 so you don't have to https://workos.com/blog/oauth-best-practices
[3] Best Practices | Authorization Resources - Google for Developers https://developers.google.com/identity/protocols/oauth2/resources/best-practices
[4] How to Add Auth0 to an Electron App - Unosquare https://www.unosquare.com/blog/how-to-add-auth0-to-an-electron-app/
[5] Auth0 Security Best Practices for Secure Authentication - DeepStrike https://deepstrike.io/blog/auth0-security-best-practices
