---
item: auth0-core-flow-tasks
project: manta-templates
template: electron
type: tasks
slice: 110-slice.auth0-core-flow
sliceDesign: project-artifacts/electron-template/slices/110-slice.auth0-core-flow.md
dependencies: []
projectState: Electron template base complete - no auth implemented
status: complete
lastUpdated: 2025-10-05
---

# Tasks: Auth0 Core OAuth Flow (Slice 110)

## Context Summary

Implementing Auth0 OAuth 2.0 + PKCE authentication for macOS only. This establishes the fundamental OAuth login flow using external browser authentication with production-grade security (PKCE + state parameter). Tokens stored in memory only (persistence comes in slice 111).

**Reference**: All implementation details in [110-slice.auth0-core-flow.md](../slices/110-slice.auth0-core-flow.md)

**Key Files to Create**:
- `src/main/auth/pkce.ts`
- `src/main/auth/auth0-config.ts`
- `src/main/auth/auth0-client.ts`
- `src/main/auth/protocol-handler.ts`
- `src/preload/preload.ts` (auth bridge)
- `src/renderer/TestAuth.tsx` (optional)

## Phase 1: Project Setup & Environment

### Task 1.1: Create Auth Directory Structure
**Effort**: 1/5

- [x] Create directory: `src/main/auth/`
- [x] Verify directory created successfully
- [x] **Success**: Directory exists and is ready for auth files

### Task 1.2: Configure Environment Variables
**Effort**: 1/5

- [x] Create `.env.example` file in project root with Auth0 variables
  - `AUTH0_DOMAIN=your-tenant.auth0.com`
  - `AUTH0_CLIENT_ID=your_native_app_client_id`
  - `AUTH0_AUDIENCE=https://your-api.com  # Optional`
- [x] Create `.env` file (gitignored) with actual Auth0 credentials
- [x] Verify environment variables load correctly in Electron
- [x] **Success**: Environment variables accessible via `process.env`

**Reference**: See slice design lines 462-469 for exact format

### Task 1.3: Set Up Auth0 Native Application
**Effort**: 1/5

**Note**: This is manual setup in Auth0 dashboard

- [ ] Log into Auth0 dashboard
- [ ] Create new Application with type: **Native**
- [ ] Configure Application settings:
  - Application Name: "Electron Template App" (or your app name)
  - Allowed Callback URLs: `electronapp://callback`
  - Allowed Logout URLs: `electronapp://logout`
  - Token Endpoint Authentication Method: **None** (PKCE)
  - Grant Types: Authorization Code, Refresh Token
- [ ] Copy Client ID to `.env` as `AUTH0_CLIENT_ID`
- [ ] Copy Domain to `.env` as `AUTH0_DOMAIN`
- [ ] **Success**: Auth0 application configured and credentials in `.env`

**Reference**: Slice design lines 60-64 for exact configuration requirements

## Phase 2: Core PKCE Implementation

### Task 2.1: Implement PKCE Utilities
**Effort**: 2/5

- [x] Create file: `src/main/auth/pkce.ts`
- [x] Implement `generatePKCEPair()` function:
  - Generate 128-byte random verifier via `crypto.randomBytes(128)`
  - Encode verifier as base64url
  - Generate SHA-256 hash of verifier
  - Encode challenge as base64url
  - Return `{ verifier, challenge }`
- [x] Implement `generateState()` function:
  - Generate 32-byte random state via `crypto.randomBytes(32)`
  - Encode as base64url
  - Return state string
- [x] Add TypeScript types for return values
- [x] **Success**: Functions generate cryptographically secure PKCE pair and state

**Reference**: Exact implementation in slice design lines 164-184

**Security Note**: Must use `crypto.randomBytes()` for cryptographic randomness, NOT `Math.random()`

### Task 2.2: Test PKCE Generation (Optional)
**Effort**: 1/5

- [x] Create simple test to verify PKCE pair generation
- [x] Verify verifier is base64url encoded (no +, /, = characters)
- [x] Verify challenge is SHA-256 hash of verifier
- [x] Verify state is 32 bytes encoded as base64url
- [x] **Success**: PKCE generation produces valid, secure values

## Phase 3: Auth0 Configuration

### Task 3.1: Implement Auth0 Config Module
**Effort**: 2/5

- [x] Create file: `src/main/auth/auth0-config.ts`
- [x] Export `auth0Config` object with properties:
  - `domain: process.env.AUTH0_DOMAIN!`
  - `clientId: process.env.AUTH0_CLIENT_ID!`
  - `audience: process.env.AUTH0_AUDIENCE` (optional)
  - `scope: 'openid profile email offline_access'`
  - `redirectUri: 'electronapp://callback'`
- [x] Add validation logic:
  - Check if `domain` and `clientId` are present
  - If missing, log helpful error message with formatting:
    ```
    \n❌ Auth0 Configuration Error:\n
       AUTH0_DOMAIN and AUTH0_CLIENT_ID must be set in .env\n
       See .env.example for required variables\n
    ```
  - Throw error: `Missing Auth0 configuration`
- [x] **Success**: Config loads from env vars with clear error if missing

**Reference**: Exact implementation in slice design lines 186-206

**Critical**: Error message must be helpful and point to `.env.example`

## Phase 4: Auth0 Client Implementation

### Task 4.1: Create Auth0Client Class Structure
**Effort**: 2/5

- [x] Create file: `src/main/auth/auth0-client.ts`
- [x] Import dependencies:
  - `shell` from `electron`
  - `generatePKCEPair`, `generateState` from `./pkce`
  - `auth0Config` from `./auth0-config`
- [x] Define `PendingAuth` interface:
  - `state: string`
  - `codeVerifier: string`
  - `timestamp: number`
- [x] Define `TokenSet` interface:
  - `accessToken: string`
  - `refreshToken: string`
  - `idToken: string`
  - `expiresAt: number`
- [x] Create `Auth0Client` class with private properties:
  - `pendingAuth: PendingAuth | null = null`
  - `tokens: TokenSet | null = null`
  - `STATE_TIMEOUT = 10 * 60 * 1000` (10 minutes)
  - `debug = process.env.NODE_ENV === 'development'`
- [x] **Success**: Class structure ready for method implementation

**Reference**: Slice design lines 208-232 for exact structure

### Task 4.2: Implement login() Method
**Effort**: 3/5

- [x] Implement `async login(): Promise<void>` method
- [x] Generate PKCE pair: `const { verifier, challenge } = generatePKCEPair()`
- [x] Generate state: `const state = generateState()`
- [x] Store pending auth state:
  ```typescript
  this.pendingAuth = {
    state,
    codeVerifier: verifier,
    timestamp: Date.now()
  }
  ```
- [x] Build authorization URL using `new URL()`:
  - Base: `https://${auth0Config.domain}/authorize`
  - Set searchParams: `client_id`, `redirect_uri`, `response_type`, `code_challenge`, `code_challenge_method`, `state`, `scope`
  - Conditionally add `audience` if present
- [x] Add debug logging (development only):
  - Log auth URL
  - Log state parameter
  - Log code challenge (first 20 chars + "...")
- [x] Call `shell.openExternal(authUrl.toString())`
- [x] **Success**: Login opens external browser with correct Auth0 URL

**Reference**: Exact implementation in slice design lines 234-267

**Critical**:
- Must use `shell.openExternal()` (not embedded browser)
- Must store verifier in memory for later verification
- Debug logs only when `process.env.NODE_ENV === 'development'`

### Task 4.3: Implement handleCallback() Method
**Effort**: 3/5

- [x] Implement `async handleCallback(callbackUrl: string): Promise<void>`
- [x] Parse callback URL: `const url = new URL(callbackUrl)`
- [x] Check for Auth0 error response:
  - Extract `error` parameter
  - If present, extract `error_description`
  - Clear pending state: `this.pendingAuth = null`
  - Throw error with message: `Auth0 error: ${error} - ${errorDesc || 'Unknown error'}`
- [x] Extract code and state from URL:
  - `const code = url.searchParams.get('code')`
  - `const receivedState = url.searchParams.get('state')`
- [x] Verify state by calling `this.verifyState(receivedState)`
  - If invalid, throw error: `Invalid state parameter - possible CSRF attack`
- [x] Verify code exists, throw error if missing
- [x] Exchange code for tokens: `await this.exchangeCodeForTokens(code, this.pendingAuth!.codeVerifier)`
- [x] Store tokens in memory: `this.tokens = tokens`
- [x] Clear pending state: `this.pendingAuth = null`
- [x] Log success message with token expiry
- [x] **Success**: Callback properly validates state and exchanges code for tokens

**Reference**: Exact implementation in slice design lines 269-304

**Critical**:
- Must handle Auth0 error responses (user denial)
- Must verify state parameter (CSRF protection)
- Must clear pending state after error or success

### Task 4.4: Implement verifyState() Method
**Effort**: 2/5

- [x] Implement `private verifyState(receivedState: string | null): boolean`
- [x] Check if pending auth exists and receivedState is not null
  - Return `false` if either is missing
- [x] Check timeout:
  - Calculate elapsed time: `Date.now() - this.pendingAuth.timestamp`
  - If elapsed > `STATE_TIMEOUT`, clear pending state and return `false`
- [x] Verify state matches: `return receivedState === this.pendingAuth.state`
- [x] **Success**: State verification prevents CSRF and replay attacks

**Reference**: Exact implementation in slice design lines 306-320

**Security**: 10-minute timeout prevents replay attacks

### Task 4.5: Implement exchangeCodeForTokens() Method
**Effort**: 3/5

- [x] Implement `private async exchangeCodeForTokens(code: string, codeVerifier: string): Promise<TokenSet>`
- [x] Call Auth0 token endpoint:
  - URL: `https://${auth0Config.domain}/oauth/token`
  - Method: POST
  - Headers: `{ 'Content-Type': 'application/json' }`
  - Body: JSON stringified object with:
    - `grant_type: 'authorization_code'`
    - `client_id: auth0Config.clientId`
    - `code`
    - `code_verifier: codeVerifier`
    - `redirect_uri: auth0Config.redirectUri`
- [x] Handle error response:
  - Check `response.ok`
  - If not ok, get error text and throw with message
- [x] Parse JSON response: `const data = await response.json()`
- [x] Return TokenSet with defensive expiry calculation:
  ```typescript
  {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    idToken: data.id_token,
    expiresAt: Date.now() + ((data.expires_in || 3600) * 1000)
  }
  ```
- [x] **Success**: Code exchanged for tokens with proper error handling

**Reference**: Exact implementation in slice design lines 322-354

**Critical**: Must use PKCE verifier in exchange, NOT the challenge
**Defense**: Default to 3600 seconds (1 hour) if `expires_in` missing

### Task 4.6: Implement getTokens() Debug Method
**Effort**: 1/5

- [x] Implement `getTokens(): TokenSet | null` method
- [x] Return `this.tokens`
- [x] **Success**: Debug method allows testing token retrieval

**Reference**: Slice design lines 356-359

### Task 4.7: Export Auth0Client Singleton
**Effort**: 1/5

- [x] At end of file, export singleton: `export const auth0Client = new Auth0Client()`
- [x] **Success**: Single instance available for import

**Reference**: Slice design line 362

## Phase 5: Protocol Handler Implementation

### Task 5.1: Implement Protocol Registration
**Effort**: 2/5

- [x] Create file: `src/main/auth/protocol-handler.ts`
- [x] Import dependencies:
  - `app, protocol` from `electron`
  - `auth0Client` from `./auth0-client`
- [x] Implement `registerAuthProtocol()` function:
  - Call `protocol.registerSchemesAsPrivileged()` with array:
    ```typescript
    [{
      scheme: 'electronapp',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: false,
        corsEnabled: false
      }
    }]
    ```
- [x] Export function
- [x] **Success**: Custom protocol registered with correct privileges

**Reference**: Exact implementation in slice design lines 367-384

**Critical**: Must be called BEFORE `app.ready` event

### Task 5.2: Implement Protocol Handler Setup (macOS)
**Effort**: 2/5

- [x] Implement `setupAuthProtocolHandler()` function
- [x] Check platform and register as default handler:
  ```typescript
  if (process.platform === 'darwin') {
    app.setAsDefaultProtocolClient('electronapp')
  }
  ```
- [x] Set up `open-url` event listener:
  - Listen for `app.on('open-url')`
  - Call `event.preventDefault()`
  - Check if URL starts with `electronapp://callback`
  - If yes, call `await auth0Client.handleCallback(url)` in try/catch
  - Log any errors to console
- [x] Export function
- [x] **Success**: Protocol handler intercepts callback URLs on macOS

**Reference**: Exact implementation in slice design lines 386-404

**Critical macOS Note**: Must call `setAsDefaultProtocolClient()` AFTER app is ready on macOS

## Phase 6: Preload Bridge Implementation

### Task 6.1: Create Auth IPC Bridge
**Effort**: 2/5

- [x] Edit or create file: `src/preload/preload.ts`
- [x] Import `contextBridge, ipcRenderer` from `electron`
- [x] Expose auth APIs via `contextBridge.exposeInMainWorld`:
  ```typescript
  contextBridge.exposeInMainWorld('electronAPI', {
    auth: {
      login: () => ipcRenderer.invoke('auth:login'),
      getTokens: () => ipcRenderer.invoke('auth:get-tokens')
    }
  })
  ```
- [x] Add TypeScript type declarations:
  ```typescript
  declare global {
    interface Window {
      electronAPI: {
        auth: {
          login: () => Promise<void>
          getTokens: () => Promise<TokenSet | null>
        }
      }
    }
  }
  ```
- [x] **Success**: Renderer can securely call auth methods via IPC

**Reference**: Exact implementation in slice design lines 407-431

**Security**: Uses `contextBridge` for secure IPC exposure (context isolation)

## Phase 7: Main Process Integration

### Task 7.1: Integrate Auth into Main Process
**Effort**: 2/5

- [x] Edit file: `src/main/main.ts`
- [x] Add imports at top:
  ```typescript
  import { registerAuthProtocol, setupAuthProtocolHandler } from './auth/protocol-handler'
  import { auth0Client } from './auth/auth0-client'
  ```
- [x] Call `registerAuthProtocol()` BEFORE `app.whenReady()`
  - Add at top level, outside any functions
- [x] Inside `app.whenReady()` callback, add at top:
  - Call `setupAuthProtocolHandler()`
- [x] Add IPC handlers inside `app.whenReady()`:
  ```typescript
  ipcMain.handle('auth:login', async () => {
    await auth0Client.login()
  })

  ipcMain.handle('auth:get-tokens', () => {
    return auth0Client.getTokens()
  })
  ```
- [x] **Success**: Main process wired up for auth

**Reference**: Exact implementation in slice design lines 433-460

**Critical Order**:
1. `registerAuthProtocol()` - before app ready
2. `setupAuthProtocolHandler()` - after app ready
3. IPC handlers - after app ready

## Phase 8: Test UI Implementation (Optional)

### Task 8.1: Create Test Auth Component
**Effort**: 2/5

**Note**: This is optional but highly recommended for easier testing

- [x] Create file: `src/renderer/TestAuth.tsx`
- [x] Import `useState` from `react`
- [x] Define `TokenSet` interface (matching main process)
- [x] Implement `TestAuth` functional component with state:
  - `tokens: TokenSet | null`
  - `loading: boolean`
- [x] Implement `handleLogin` function:
  - Set loading true
  - Call `await window.electronAPI.auth.login()`
  - Log "Login initiated - check browser"
  - Handle errors and log to console
  - Set loading false in finally block
- [x] Implement `handleGetTokens` function:
  - Call `await window.electronAPI.auth.getTokens()`
  - Set tokens in state
  - Handle errors
- [x] Render UI:
  - Login button (disabled when loading)
  - Get Tokens button
  - Display tokens in formatted `<pre>` if present
  - Show expiry time
- [x] Export component
- [x] **Success**: Test UI component ready for use

**Reference**: Exact implementation in slice design lines 471-538

**Usage**: Add `<TestAuth />` to App.tsx for testing

### Task 8.2: Integrate Test UI into App (Optional)
**Effort**: 1/5

- [x] Edit `src/App.tsx` or equivalent
- [x] Import `TestAuth` component
- [x] Add `<TestAuth />` to app render (e.g., in a dev-only route or section)
- [x] **Success**: Test UI visible in app for manual testing

## Phase 9: Testing & Validation

### Task 9.1: Manual End-to-End Test
**Effort**: 2/5

**Prerequisites**: Auth0 app configured, env vars set

- [x] Start Electron app in development mode: `pnpm dev`
- [x] Open Electron DevTools (F12)
- [x] Click "Login with Auth0" button in Test UI
- [x] Verify external browser opens with Auth0 login page
- [x] Check console for debug logs (auth URL, state, challenge)
- [x] Complete authentication in browser
- [x] Verify app intercepts callback (check console logs)
- [x] Click "Get Tokens" button
- [x] Verify tokens display with:
  - `accessToken` present
  - `refreshToken` present
  - `idToken` present
  - `expiresAt` timestamp is future date
- [x] **Success**: Complete OAuth flow works end-to-end

**Debugging**: If callback not intercepted, verify protocol registered in OS

### Task 9.2: Test Error Scenarios
**Effort**: 2/5

- [ ] **Test User Denial**:
  - Click login
  - Click "Cancel" or "Deny" on Auth0 login page
  - Verify error logged: "Auth0 error: access_denied..."
  - Verify app doesn't crash
- [ ] **Test State Timeout** (if time permits):
  - Trigger login (stores state)
  - Wait 11 minutes
  - Manually trigger callback with old state
  - Verify error: "Invalid state parameter"
- [ ] **Test Missing Env Vars**:
  - Comment out `AUTH0_DOMAIN` in `.env`
  - Restart app
  - Verify helpful error message displayed
  - Restore env var
- [ ] **Success**: Error handling works correctly

### Task 9.3: Verify Security Implementation
**Effort**: 1/5

- [ ] **Verify PKCE**:
  - Check console logs show code challenge (not verifier)
  - Verify verifier never sent to browser
  - Confirm S256 method in auth URL
- [ ] **Verify State Parameter**:
  - Check state parameter in auth URL (console log)
  - Verify state matches in callback
  - Confirm timeout is 10 minutes
- [ ] **Verify External Browser**:
  - Confirm browser opens (not embedded webview)
  - Verify no Electron window loading Auth0
- [ ] **Verify Tokens Not Exposed to Renderer**:
  - Check renderer can only access tokens via IPC
  - Confirm no tokens in localStorage/sessionStorage
- [ ] **Success**: All security measures properly implemented

### Task 9.4: Cross-Check Against Slice Design
**Effort**: 1/5

- [ ] Review slice design document section by section
- [ ] Verify all files created as specified
- [ ] Verify all methods implemented with exact signatures
- [ ] Verify all error handling present
- [ ] Verify debug logging implemented
- [ ] Verify TypeScript types match design
- [ ] **Success**: Implementation matches design exactly

## Phase 10: Documentation & Cleanup

### Task 10.1: Verify .gitignore
**Effort**: 1/5

- [x] Ensure `.env` is in `.gitignore`
- [x] Ensure `.env.example` is NOT in `.gitignore`
- [x] **Success**: Secrets not committed to git

### Task 10.2: Document Next Steps
**Effort**: 1/5

- [x] Add comment in code noting: "Tokens in memory only - Slice 111 adds persistence"
- [x] Note that Windows/Linux support comes in Slice 114
- [x] **Success**: Clear what's MVP vs. future enhancements

## Success Criteria Summary

**Functional**:
- ✅ Login flow initiates via IPC
- ✅ External browser opens with Auth0
- ✅ Protocol callback intercepted on macOS
- ✅ State verified (CSRF protection)
- ✅ Code exchanged for tokens
- ✅ Tokens stored in memory
- ✅ Tokens retrievable via IPC

**Technical**:
- ✅ PKCE properly generated (SHA-256)
- ✅ State parameter with 10-min timeout
- ✅ External browser only (no webviews)
- ✅ TypeScript strict mode compliance
- ✅ Zero native dependencies
- ✅ All error handling implemented

**Security**:
- ✅ PKCE prevents code interception
- ✅ State prevents CSRF
- ✅ Timeout prevents replay
- ✅ Cryptographically secure random
- ✅ No tokens exposed to renderer

## Total Effort Estimate

**Total**: 15/5 points across 31 tasks = approximately 2-3 days of focused work

**Breakdown**:
- Setup: 3 points
- Core Implementation: 8 points
- Integration: 2 points
- Testing: 2 points

**Next Slice**: After completion, proceed to Slice 111 (Secure Token Storage)
