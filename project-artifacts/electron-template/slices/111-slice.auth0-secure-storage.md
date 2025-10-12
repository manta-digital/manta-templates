---
item: auth0-secure-storage
project: manta-templates
template: electron
type: slice
dependencies: [110-slice.auth0-core-flow]
projectState: Slice 110 (core flow) complete - tokens in memory only
status: not started
lastUpdated: 2025-10-12
providerAgnostic: true  # Works with any OAuth provider (Auth0, Supabase, etc.)
futureRename: 111-slice.secure-token-storage.md  # TODO: Remove "auth0" prefix
---

# Slice 111: Auth0 Secure Token Storage

**Note**: This slice is **provider-agnostic** - it stores `TokenSet` objects regardless of provider (Auth0, Supabase, etc.). The "auth0" prefix is historical and will be renamed. See `056-arch.auth-providers.md` for multi-provider architecture.

## Overview
Placeholder - Design to be created after slice 110 is implemented.

## Scope
- electron-store integration for persistent storage
- safeStorage encryption (Keychain/DPAPI/kwallet)
- Encryption availability checking
- Graceful fallback with warnings when encryption unavailable
- Token persistence across app restarts

## Success Criteria
- Tokens securely encrypted and persisted
- Works cross-platform with appropriate OS-level encryption
- Graceful degradation on systems without encryption support
