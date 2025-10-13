---
item: auth0-ipc-react
project: manta-templates
template: electron
type: slice
dependencies: [111-slice.auth0-secure-storage]
projectState: Slices 110-111 complete - auth flow working with secure storage
status: not started
lastUpdated: 2025-10-02
---

# Slice 112: Auth0 IPC Bridge & React Integration

## Overview
Placeholder - Design to be created after slice 111 is implemented.

## Scope
- Complete IPC bridge (preload + contextBridge)
- IPC handlers for all auth operations (login, logout, getUser, getToken)
- React AuthContext + AuthProvider
- useAuth() hook
- AuthGuard component for route protection
- Auth state events (main → renderer)

## Success Criteria
- Full UI integration complete
- Protected routes work correctly
- Auth state reactive in UI
- Type-safe IPC communication
