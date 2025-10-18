---
layer: project
docType: architecture
date: 2025-10-17
status: approved
decision: separate-branches-with-license-keys
---

# Architecture: Tiered Template Distribution (Free/Pro/Premium)

## DECISION (2025-10-17)

**Status**: ✅ APPROVED - Implementation in progress

**Chosen Approach**: Separate Branches + License Key Distribution

**Rationale**:
- Simplicity over complexity for initial launch
- Distribution via Lemon Squeezy license keys (not GitHub team access)
- Can launch Pro tier within 3-5 days

### Approved Tier Structure

#### Free Tier (Public)
**Price**: $0
**Repository**: `github.com/manta-digital/manta-templates` (public, `main` branch)

**Included**:
- ✅ Electron base template
- ✅ React template
- ✅ Next.js template
- ✅ UI components (Radix, Tailwind)
- ✅ Basic routing, state management
- ❌ NO auth
- ❌ NO payments
- ❌ NO advanced integrations

#### Pro Tier (Private)
**Price**: $149 (one-time, 1 year updates)
**Repository**: `github.com/manta-digital/manta-templates-pro` (private, `pro` branch)
**Distribution**: License key via Lemon Squeezy

**Included**:
- ✅ Everything in Free
- ✅ **Auth providers**: Auth0 (working), Firebase, basic auth scaffold
- ✅ **Email integration**: Resend, SendGrid, Postmark (contact forms, transactional emails)
- ✅ **CAPTCHA protection**: Cloudflare Turnstile, reCAPTCHA v3, hCaptcha
- ✅ **File uploads**: Uploadthing integration (images, documents, drag-drop)
- ✅ **Lemon Squeezy integration** (checkout, webhooks, basic customer management)
- ✅ **Pre-built forms**: Contact, signup, password reset (with validation)
- ✅ **Rate limiting**: Upstash Redis (API protection, form spam prevention)
- ✅ Comprehensive OAuth guides (Electron OAuth hell solved)
- ✅ **All templates** (Electron, React, Next.js) - "Buy once, use everywhere"
- ✅ 1 year of updates

**Value Proposition**: "Production-ready auth + payments + email + forms in 5 minutes"

#### Premium Tier (Future)
**Price**: $299-399 (one-time, lifetime updates)
**Repository**: TBD (private)
**Distribution**: License key

**Included**:
- ✅ Everything in Pro
- ✅ **Stripe integration** (full control, lower fees for scale)
- ✅ **SMS/Phone verification**: Twilio integration (2FA, phone verification)
- ✅ **Advanced file storage**: AWS S3 + CloudFront (scalable, cheap at scale)
- ✅ **Deep Electron/Tauri integration** (custom protocols, all platform-specific pain solved)
- ✅ **SciChart integration** (unique offering, high-value)
- ✅ **Enterprise SSO** (Okta, Azure AD)
- ✅ **All future auth providers** (Supabase, Stytch, etc.)
- ✅ **Analytics**: Plausible, PostHog (privacy-focused, product analytics)
- ✅ **Multi-tenant architecture** examples
- ✅ **Full customer portal** (Lemon Squeezy advanced features)
- ✅ **Webhook infrastructure** (pre-built handlers for common services)
- ✅ Lifetime updates
- ✅ Priority support

**Value Proposition**: "Enterprise-ready, everything included, zero limitations"

### Distribution Strategy: License Keys (APPROVED)

**Method**: Lemon Squeezy auto-generates license keys on purchase

**Customer Flow**:
1. Customer purchases Pro tier ($149) on website
2. Lemon Squeezy webhook fires
3. Email sent with license key + setup instructions
4. Customer uses CLI or manual setup:
   ```bash
   npx create-manta-app my-app --license MANTA-PRO-ABC123...
   ```
5. CLI validates key against API (Supabase backend)
6. If valid → downloads template from private GitHub repo (temporary token)
7. Customer has local copy, can modify freely

**Why License Keys (vs GitHub Team Access)**:
- ✅ Scalable - no manual user management
- ✅ Revocable - deactivate on refund/chargeback
- ✅ Trackable - analytics on template usage
- ✅ Multi-template - same key works for Electron, React, Next.js
- ✅ No GitHub requirement - customer doesn't need account
- ✅ Future-proof - supports team licenses, feature gating
- ❌ Requires API/database - Supabase free tier (acceptable tradeoff)

**Technical Implementation**:
- Lemon Squeezy: Payment processing + license key generation
- Supabase: License key storage + validation API
- GitHub API: Temporary token generation for repo download
- Cloudflare Worker/Vercel Function: Webhook handler

### Migration Notice (30 Days)

**Landing page notice**:
> "Auth was previously announced for the free tier. We've decided to move auth to the Pro tier to support ongoing development. If you were expecting free auth, please contact us within 30 days and we'll honor the original plan for you."

**Estimated cost**: $0-150 (0-1 customers likely affected)

### Launch Timeline

**Target**: Pro tier launch within 5 days

**Phase 1** (Day 1): Architecture finalization ✅
- Finalize tier structure ✅
- Update this document ✅
- Create branch split plan ⬜

**Phase 2** (Day 2): Lemon Squeezy integration (in current codebase)
- Basic checkout component
- Webhook handler
- License key validation
- Slice design: 120-slice.lemon-squeezy-basic

**Phase 3** (Day 3): Branch split execution
- Create `pro` branch from checkpoint
- Strip auth/payments from `main` (Free tier)
- Test both tiers build/run

**Phase 4** (Day 4): Distribution setup
- Create Lemon Squeezy product ($149)
- Deploy webhook handler
- Test purchase flow end-to-end

**Phase 5** (Day 5): Marketing + launch
- Update landing page (pricing table, 30-day notice)
- Demo video (auth + payments working)
- Soft launch announcement

---

## Problem Statement

How to structure manta-templates to support multiple pricing tiers (e.g., Free, Pro, Premium) where certain features like Auth0 integration are gated behind paid tiers?

## Requirements

1. **Feature Gating**: Some features (Auth0, advanced components) only in paid tiers
2. **Maintainability**: Single codebase, not 3 separate repos
3. **User Experience**: Clear upgrade path, no confusing "missing features"
4. **Distribution**: Easy to deliver the right tier to customers
5. **Development**: Efficient to develop/test all tiers simultaneously

---

## Industry Patterns (Established Approaches)

### Pattern 1: **Separate Branches per Tier** (GitHub Standard)
**Examples**: Tailwind UI, Flowbite, ShadCN Pro (planned)

```
manta-templates/
├── main (free tier)
├── pro (adds pro features on top of free)
└── premium (adds premium on top of pro)
```

**How it works**:
- `main` = Free tier (public)
- `pro` = Periodically merges from `main` + pro-only commits
- `premium` = Periodically merges from `pro` + premium-only commits

**Pros**:
- ✅ Clean separation
- ✅ Free tier stays public (good for marketing)
- ✅ Easy to deliver (clone branch, done)
- ✅ Git naturally handles "tier inheritance"

**Cons**:
- ❌ Merge conflicts when syncing tiers
- ❌ Features developed in wrong branch need cherry-picking
- ❌ Can't test all tiers simultaneously easily

**Distribution**:
```bash
# Free customers
git clone https://github.com/manta-digital/manta-templates.git

# Pro customers (private access)
git clone -b pro https://github.com/manta-digital/manta-templates.git

# Premium customers
git clone -b premium https://github.com/manta-digital/manta-templates.git
```

---

### Pattern 2: **Monorepo with Feature Packages** (Component Library Style)
**Examples**: Radix Themes, Chakra Pro, MUI X

```
manta-templates/
├── packages/
│   ├── free/               # Free features
│   ├── pro/                # Pro-only features
│   └── premium/            # Premium-only features
└── templates/
    ├── electron-free/      # References packages/free
    ├── electron-pro/       # References packages/free + pro
    └── electron-premium/   # References all packages
```

**How it works**:
- Each tier is a complete template that imports from tier packages
- User gets one template folder, already configured for their tier
- Upgrade = replace template folder + add package access

**Pros**:
- ✅ Single source of truth for features
- ✅ Easy to test all tiers (just different imports)
- ✅ Clear "what's in each tier" (look at packages)
- ✅ DRY - free features not duplicated

**Cons**:
- ❌ More complex build setup
- ❌ Need to manage package dependencies
- ❌ Customers see "pro packages" in node_modules (temptation to hack)

**Distribution**:
```bash
# Free
npx create-manta-app my-app --tier=free

# Pro (requires auth token)
npx create-manta-app my-app --tier=pro --token=<customer-token>

# Premium
npx create-manta-app my-app --tier=premium --token=<customer-token>
```

---

### Pattern 3: **Build-Time Feature Flags** (Enterprise Pattern)
**Examples**: Next.js Commerce, Vercel templates, AWS Amplify

```
manta-templates/
├── features/
│   ├── auth/                    # Auth feature
│   │   ├── auth0.ts            # Pro+
│   │   ├── supabase.ts         # Pro+
│   │   └── basic.ts            # Free
│   └── analytics/
│       ├── advanced.ts         # Premium
│       └── basic.ts            # Free
├── config/
│   ├── features.free.json
│   ├── features.pro.json
│   └── features.premium.json
└── templates/electron/
```

**How it works**:
- All features exist in one codebase
- Build script uses tier config to include/exclude features
- Customer receives built template for their tier

**Pros**:
- ✅ Single codebase, all tiers in one place
- ✅ Easy to develop (no branch juggling)
- ✅ Easy to test (just change config)
- ✅ Customers can't see premium code (not in delivered files)

**Cons**:
- ❌ Requires build tooling
- ❌ More complex CI/CD (build 3 versions)
- ❌ Feature flag complexity in code

**Implementation**:
```typescript
// Build-time flag (removed in free tier builds)
// @tier: pro
export const auth0Integration = { ... }

// Runtime check (stays in all tiers)
if (config.tier === 'pro') {
  enableAuth0()
}
```

**Distribution**:
```bash
# Build process
pnpm build --tier=free      # Strips @tier: pro|premium code
pnpm build --tier=pro       # Strips @tier: premium code
pnpm build --tier=premium   # Includes everything

# Customer gets pre-built template
npx create-manta-app my-app --tier=pro --token=xyz
```

---

### Pattern 4: **Runtime Feature Flags** (SaaS App Pattern)
**Examples**: Feature flags services (LaunchDarkly, Unleash)

**NOT RECOMMENDED for templates** - This is for deployed apps, not starter templates.

---

## Recommendation for Manta Templates

### **Hybrid Approach: Monorepo + Build-Time Flags**

Combines best of Pattern 2 and Pattern 3:

```
manta-templates/
├── packages/
│   ├── ui-core/              # Free (framework-agnostic UI)
│   ├── ui-adapters/          # Free (framework adapters)
│   ├── auth-basic/           # Free (basic auth scaffold)
│   ├── auth-providers/       # Pro (Auth0, Supabase, etc.)
│   └── analytics-pro/        # Premium (advanced analytics)
│
├── templates/
│   └── electron/
│       ├── src/
│       │   ├── features/
│       │   │   ├── auth/
│       │   │   │   ├── index.ts          # Free (basic)
│       │   │   │   └── auth0.ts          # Pro (via build flag)
│       │   │   └── analytics/
│       │   │       ├── index.ts          # Free (basic)
│       │   │       └── advanced.ts       # Premium
│       │   └── config/
│       │       ├── tier.ts               # Tier detection
│       │       └── features.ts           # Feature registry
│       │
│       ├── build/
│       │   ├── tier-free.config.js
│       │   ├── tier-pro.config.js
│       │   └── tier-premium.config.js
│       │
│       └── package.json
│           └── "build:free": "vite build --config build/tier-free.config.js"
│
└── config/
    ├── tiers.json              # Central tier definitions
    └── features.json           # Feature → tier mapping
```

### Why This Approach?

**Advantages**:
1. ✅ **Single Source of Truth**: All code in one place
2. ✅ **Clean Packages**: Free packages public, pro packages private
3. ✅ **Build-Time Stripping**: Customers never see premium code
4. ✅ **Easy Development**: Work on all tiers simultaneously
5. ✅ **Clear Upgrade Path**: Features documented, easy to see what's premium
6. ✅ **Flexible Distribution**: npm, GitHub, or download

**How Features Are Gated**:

```typescript
// config/tiers.json
{
  "tiers": {
    "free": {
      "features": ["basic-auth", "ui-core", "basic-analytics"]
    },
    "pro": {
      "features": ["basic-auth", "ui-core", "basic-analytics",
                   "auth0", "supabase-auth", "advanced-routing"],
      "includes": "free"
    },
    "premium": {
      "features": ["*", "premium-analytics", "ai-integration"],
      "includes": "pro"
    }
  }
}

// src/features/auth/index.ts
import { getTier } from '@/config/tier'

// Free tier: basic auth scaffold
export { BasicAuth } from './basic'

// Pro+ tier: Auth0, Supabase
if (getTier() === 'pro' || getTier() === 'premium') {
  export { Auth0Client } from './auth0'      // Only in pro+ builds
  export { SupabaseAuth } from './supabase'  // Only in pro+ builds
}

// Premium tier: Enterprise SSO
if (getTier() === 'premium') {
  export { EnterpriseSSO } from './enterprise'  // Only in premium builds
}
```

### Build Process

```javascript
// build/tier-free.config.js
export default {
  define: {
    'process.env.TIER': JSON.stringify('free'),
  },
  build: {
    rollupOptions: {
      // Strip imports that reference pro packages
      external: ['@manta/auth-providers', '@manta/analytics-pro'],
    },
  },
}

// build/tier-pro.config.js
export default {
  define: {
    'process.env.TIER': JSON.stringify('pro'),
  },
  // Pro includes everything from packages/auth-providers
}
```

### Tree Shaking

Modern bundlers (Vite, Webpack) will automatically remove:
- Unused imports (dead code elimination)
- Conditional code that can never execute
- Comments with tier markers

```typescript
// This code is completely removed in free tier builds:
if (process.env.TIER === 'pro') {
  const auth0 = await import('./auth0')  // Never imported = not bundled
  auth0.initialize()
}
```

---

## Specific: Auth0 as Pro Feature

### Current State (Issue #87 Just Completed)
- Auth0 already has `AUTH_ENABLED` flag
- Code gracefully handles disabled state
- **Already 90% ready for tiering!**

### Changes Needed for Pro Gating

**1. Move Auth0 to Pro Package**
```
packages/
└── auth-providers/           # New package (Pro tier)
    ├── auth0/
    │   ├── auth0-client.ts
    │   ├── auth0-config.ts
    │   └── protocol-handler.ts
    ├── supabase/
    └── index.ts
```

**2. Free Tier Gets Auth Scaffold**
```
templates/electron/src/features/auth/
├── basic/                    # Free tier
│   ├── local-auth.ts        # Simple local auth example
│   └── README.md            # "Upgrade to Pro for Auth0"
└── index.ts
```

**3. Build Configuration**
```json
// package.json
{
  "scripts": {
    "build:free": "TIER=free vite build",
    "build:pro": "TIER=pro vite build",
    "build:premium": "TIER=premium vite build"
  },
  "dependencies": {
    "@manta/ui-core": "workspace:*"
  },
  "optionalDependencies": {
    "@manta/auth-providers": "workspace:*"  // Only installed for pro+
  }
}
```

**4. Feature Detection**
```typescript
// src/lib/tier.ts
export function getTier(): 'free' | 'pro' | 'premium' {
  return process.env.TIER || 'free'
}

export function hasFeature(feature: string): boolean {
  const tierFeatures = {
    free: ['basic-auth', 'ui-core'],
    pro: ['basic-auth', 'ui-core', 'auth0', 'supabase'],
    premium: ['basic-auth', 'ui-core', 'auth0', 'supabase', 'analytics-pro']
  }
  return tierFeatures[getTier()].includes(feature)
}

// Usage in code
import { hasFeature } from '@/lib/tier'

if (hasFeature('auth0')) {
  const { Auth0Client } = await import('@manta/auth-providers/auth0')
  // Initialize Auth0
} else {
  // Show upgrade prompt or use basic auth
}
```

---

## Distribution Strategy

### Option A: npm Scoped Packages (Recommended)
```bash
# Free (public)
npm install -g @manta/create-app
npx @manta/create-app my-app --template electron

# Pro (requires npm auth token)
npm login --scope=@manta --registry=https://registry.manta.digital
npx @manta/create-app my-app --template electron --tier pro

# Premium
npx @manta/create-app my-app --template electron --tier premium
```

### Option B: GitHub Releases with Gated Access
```bash
# Free (public)
gh repo clone manta-digital/manta-templates
cd manta-templates && pnpm create:free

# Pro (private repo access required)
gh repo clone manta-digital/manta-templates-pro
cd manta-templates-pro && pnpm create:pro

# Premium
gh repo clone manta-digital/manta-templates-premium
```

### Option C: License Key System (Most Flexible)
```bash
# All tiers use same installer
npx create-manta-app my-app --template electron

# License key determines tier (validated at install time)
npx create-manta-app my-app --license YOUR_LICENSE_KEY

# Key contains tier info, verified against server
# If valid pro key: installs pro packages
# If free/invalid: installs only free packages
```

---

## Migration Path (Current → Tiered)

### Phase 1: Prepare Architecture (Now)
- [x] Auth already has `AUTH_ENABLED` flag (good!)
- [ ] Move Auth0 code to `packages/auth-providers/auth0/`
- [ ] Create `packages/auth-basic/` for free tier
- [ ] Add tier detection utilities

### Phase 2: Build Configuration
- [ ] Create tier-specific build configs
- [ ] Test tree shaking works correctly
- [ ] Verify pro code not in free builds

### Phase 3: Package Structure
- [ ] Split packages into free/pro/premium
- [ ] Update import paths
- [ ] Create tier-aware package.json

### Phase 4: Distribution
- [ ] Set up npm registry (or GitHub packages)
- [ ] Create authentication mechanism
- [ ] Build CLI installer with tier support

### Phase 5: Documentation
- [ ] Document tier differences
- [ ] Create upgrade guides
- [ ] Marketing materials showing tier features

---

## Implementation Example: Auth0 Tiering

### Current Structure (Single Tier)
```
templates/electron/src/main/auth/
├── auth0-client.ts
├── auth0-config.ts
├── protocol-handler.ts
├── pkce.ts
└── logger.ts
```

### After Tiering
```
packages/auth-providers/     # Pro package
└── auth0/
    ├── auth0-client.ts
    ├── auth0-config.ts
    ├── protocol-handler.ts
    ├── pkce.ts
    └── index.ts

packages/auth-basic/         # Free package
└── scaffold/
    ├── basic-auth.ts        # Simple auth example
    ├── README.md            # "Upgrade to Pro"
    └── index.ts

templates/electron/src/main/auth/
├── index.ts                 # Tier-aware exports
└── config.ts                # Tier configuration
```

### Tier-Aware Main Entry Point
```typescript
// templates/electron/src/main/auth/index.ts
import { getTier, hasFeature } from '@/lib/tier'

// Free tier: basic auth scaffold
export * from '@manta/auth-basic/scaffold'

// Pro+ tier: Auth providers
if (hasFeature('auth0')) {
  export {
    Auth0Client,
    auth0Config,
    registerAuthProtocol,
    setupAuthProtocolHandler
  } from '@manta/auth-providers/auth0'
}

if (hasFeature('supabase-auth')) {
  export { SupabaseAuth } from '@manta/auth-providers/supabase'
}

// Premium tier: Enterprise SSO
if (hasFeature('enterprise-sso')) {
  export { EnterpriseSSO } from '@manta/auth-providers/enterprise'
}
```

### Build Output Verification
```bash
# Free build
pnpm build:free
ls -lh dist/          # Should be ~2MB (no Auth0 code)
grep -r "auth0" dist/ # Should find nothing

# Pro build
pnpm build:pro
ls -lh dist/          # Should be ~3MB (includes Auth0)
grep -r "auth0" dist/ # Should find Auth0 code

# Premium build
pnpm build:premium
ls -lh dist/          # Should be ~4MB (includes everything)
```

---

## Comparison Matrix

| Feature | Separate Branches | Monorepo Packages | Build-Time Flags | Hybrid (Recommended) |
|---------|------------------|-------------------|------------------|---------------------|
| Single codebase | ❌ | ✅ | ✅ | ✅ |
| Easy development | ❌ | ✅ | ✅ | ✅ |
| Clean separation | ✅ | ⚠️ | ❌ | ✅ |
| No premium code leak | ⚠️ | ❌ | ✅ | ✅ |
| Simple distribution | ✅ | ⚠️ | ⚠️ | ✅ |
| Test all tiers easily | ❌ | ✅ | ✅ | ✅ |
| Marketing (free public) | ✅ | ✅ | ⚠️ | ✅ |
| Upgrade path | ⚠️ | ✅ | ✅ | ✅ |
| Maintenance effort | ❌ | ⚠️ | ⚠️ | ✅ |

---

## Open Questions for Discussion

1. **Pricing Model**: Fixed tiers or feature à la carte?
2. **Free Tier Scope**: How much should free include? (marketing vs. value)
3. **Distribution Method**: npm, GitHub, or custom platform?
4. **License Verification**: Online check, offline keys, or honor system?
5. **Updates**: How do paid customers get template updates?
6. **Support**: Different support tiers for free/pro/premium?

---

## Recommendation Summary

**For manta-templates, I recommend**:

1. **Architecture**: Hybrid (Monorepo + Build-Time Flags)
2. **Auth0 Positioning**: Pro feature (free tier gets scaffold + docs)
3. **Distribution**: npm scoped packages with license key verification
4. **Migration**: Gradual (Phase 1-5 over several sprints)

**Why**:
- Maintains single codebase (easier to develop)
- Customers get clean builds (no premium code in free tier)
- Flexible distribution (can do npm, GitHub, or direct)
- Current `AUTH_ENABLED` pattern fits perfectly
- Natural upgrade path (add packages, rebuild)

**Next Steps if Approved**:
1. Create `packages/auth-providers/` and `packages/auth-basic/`
2. Move Auth0 code to pro package
3. Create tier detection utilities
4. Test build process with tier flags

---

**Created**: 2025-10-17
**Status**: Proposed for PM review
**Decision Required**: Architecture approach selection
