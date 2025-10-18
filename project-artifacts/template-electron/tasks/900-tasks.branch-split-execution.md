---
item: branch-split-execution
project: manta-templates
template: electron
type: tasks
dependencies: [120-slice.lemon-squeezy-basic]
status: pending
lastUpdated: 2025-10-17
---

# Tasks: Branch Split Execution (Free vs Pro Tiers)

## Context

Execute the separation of Free and Pro tiers using git branches. After this is complete:
- `main` branch = Free tier (public repo)
- `pro` branch = Pro tier (private repo `manta-templates-pro`)

**Prerequisites**:
- ✅ Auth0 integration complete (Slice 110)
- ✅ Lemon Squeezy integration complete (Slice 120)
- ✅ Architecture decisions finalized (060-arch.tiered-templates.md)

**Related Documents**:
- [060-arch.tiered-templates.md](../architecture/060-arch.tiered-templates.md) - Architecture decisions
- [110-slice.auth0-core-flow.md](../slices/110-slice.auth0-core-flow.md) - Auth implementation
- [120-slice.lemon-squeezy-basic.md](../slices/120-slice.lemon-squeezy-basic.md) - Payments implementation

---

## Phase 1: Pre-Split Preparation

### Task 1.1: Create Checkpoint Commit
**Effort**: 1/5
**Time**: 15 minutes

This is your "everything included" snapshot before the split.

- [ ] Ensure all current work is committed
- [ ] Run full build to verify everything works:
  ```bash
  cd /Users/manta/source/repos/manta/manta-templates/templates/electron
  pnpm install
  pnpm build
  pnpm dev  # Verify app starts
  ```
- [ ] Verify Auth0 works in dev mode
- [ ] Verify Lemon Squeezy integration is functional
- [ ] Create checkpoint tag:
  ```bash
  git tag -a v1.0.0-checkpoint -m "Checkpoint before tier split - full Pro tier"
  git push origin v1.0.0-checkpoint
  ```
- [ ] Document commit SHA for reference:
  ```bash
  git rev-parse HEAD > .tier-split-checkpoint.txt
  ```
- [ ] **Success**: Checkpoint created, full functionality verified

**Why**: This tag is your safety net. If something goes wrong, you can always get back to this state.

---

### Task 1.2: Create Feature Inventory
**Effort**: 1/5
**Time**: 20 minutes

Document exactly what needs to be stripped from Free tier.

- [ ] Create inventory file: `project-artifacts/template-electron/tasks/tier-feature-inventory.md`
- [ ] List all Pro-only directories:
  ```markdown
  ## Directories to Remove (Free Tier)
  - [ ] src/main/auth/
  - [ ] src/renderer/components/auth/
  - [ ] packages/payments/
  - [ ] packages/email/
  - [ ] packages/captcha/
  - [ ] packages/uploads/
  - [ ] packages/rate-limiting/
  ```
- [ ] List all Pro-only dependencies (from package.json):
  ```markdown
  ## Dependencies to Remove (Free Tier)
  - [ ] Lemon Squeezy SDK
  - [ ] Auth0 SDK
  - [ ] Resend/SendGrid
  - [ ] Uploadthing
  - [ ] Upstash Redis
  - (Add actual package names once implemented)
  ```
- [ ] List files to modify (remove Pro references):
  ```markdown
  ## Files to Modify (Free Tier)
  - [ ] src/main/main.ts (remove auth/payment IPC handlers)
  - [ ] src/preload/preload.ts (remove auth/payment API)
  - [ ] src/App.tsx (remove auth/payment UI)
  - [ ] .env.example (remove Pro-only env vars)
  - [ ] README.md (add "Want auth? See Pro tier" notice)
  ```
- [ ] **Success**: Complete inventory documented

---

### Task 1.3: Test Current State
**Effort**: 1/5
**Time**: 15 minutes

Verify everything works BEFORE making changes.

- [ ] Run test suite (if exists): `pnpm test`
- [ ] Build production bundle: `pnpm build`
- [ ] Test auth flow manually (login with Auth0)
- [ ] Test payment flow manually (if Lemon Squeezy integrated)
- [ ] Document any issues found
- [ ] **Success**: All tests pass, no regressions

---

## Phase 2: Create Pro Branch

### Task 2.1: Create and Push Pro Branch
**Effort**: 1/5
**Time**: 10 minutes

- [ ] Ensure you're on main with latest checkpoint:
  ```bash
  git checkout main
  git status  # Should be clean
  ```
- [ ] Create `pro` branch from checkpoint:
  ```bash
  git checkout -b pro
  ```
- [ ] Tag the pro branch:
  ```bash
  git tag -a v1.0.0-pro -m "Pro tier - Auth0 + Lemon Squeezy + Email + Forms"
  git push origin pro --tags
  ```
- [ ] Verify branch exists:
  ```bash
  git branch -a | grep pro
  ```
- [ ] **Success**: `pro` branch created and pushed

---

### Task 2.2: Create Private Pro Repository
**Effort**: 2/5
**Time**: 30 minutes

- [ ] Go to GitHub: https://github.com/manta-digital
- [ ] Create new repository:
  - Name: `manta-templates-pro`
  - Visibility: **Private**
  - Description: "Production-ready templates with auth, payments, email (Pro tier)"
  - Do NOT initialize with README (we're pushing existing code)
- [ ] Add remote to local repo:
  ```bash
  git remote add pro git@github.com:manta-digital/manta-templates-pro.git
  ```
- [ ] Push `pro` branch to new repo:
  ```bash
  git push pro pro:main
  git push pro --tags
  ```
- [ ] Verify on GitHub that private repo contains code
- [ ] Set up branch protection (optional but recommended):
  - Require pull request reviews
  - Require status checks
- [ ] **Success**: Private pro repo created and populated

---

### Task 2.3: Document Pro Repo Setup
**Effort**: 1/5
**Time**: 20 minutes

- [ ] Create `CUSTOMER_SETUP.md` in pro repo:
  ```markdown
  # Manta Templates Pro - Setup Guide

  Thank you for purchasing Manta Templates Pro!

  ## Quick Start

  1. Clone this repository:
     ```bash
     git clone git@github.com:manta-digital/manta-templates-pro.git
     cd manta-templates-pro
     ```

  2. Choose your template:
     ```bash
     cd templates/electron  # or react, nextjs
     ```

  3. Install dependencies:
     ```bash
     pnpm install
     ```

  4. Copy environment variables:
     ```bash
     cp .env.example .env
     ```

  5. Configure your services (see docs/):
     - Auth0 (auth/AUTH0_SETUP.md)
     - Lemon Squeezy (payments/LEMON_SQUEEZY_SETUP.md)
     - Email (email/EMAIL_SETUP.md)

  6. Start development:
     ```bash
     pnpm dev
     ```

  ## What's Included

  - ✅ Auth0 + Firebase authentication
  - ✅ Lemon Squeezy payments
  - ✅ Email integration (Resend, SendGrid, Postmark)
  - ✅ CAPTCHA (Cloudflare Turnstile, reCAPTCHA, hCaptcha)
  - ✅ File uploads (Uploadthing)
  - ✅ Rate limiting (Upstash)
  - ✅ Pre-built forms (contact, signup, etc.)

  ## Support

  - Documentation: docs/ folder
  - Issues: Create GitHub issue in this repo
  - Email: support@manta.digital

  ## License

  Single developer license. See LICENSE.md for details.
  ```
- [ ] Create `LICENSE.md` for pro repo:
  ```markdown
  # Manta Templates Pro License

  ## Single Developer License

  License Key: [AUTOMATICALLY ADDED BY SYSTEM]
  Purchased: [DATE]
  Customer: [EMAIL]

  ### Allowed Use

  - ✅ Use in unlimited personal projects
  - ✅ Use in unlimited client projects
  - ✅ Modify code as needed
  - ✅ One year of updates from purchase date

  ### Prohibited Use

  - ❌ Resell or redistribute templates
  - ❌ Share access with other developers
  - ❌ Create competing template products

  ### Updates

  Pull latest updates:
  ```bash
  git pull origin main
  ```

  Updates available until: [PURCHASE_DATE + 1 YEAR]

  For questions: support@manta.digital
  ```
- [ ] Commit both files to pro repo
- [ ] **Success**: Pro repo has customer-facing documentation

---

## Phase 3: Strip Free Tier (Main Branch)

### Task 3.1: Switch to Main Branch
**Effort**: 1/5
**Time**: 5 minutes

- [ ] Verify pro branch is safe:
  ```bash
  git log pro --oneline -n 5  # Should show recent commits
  ```
- [ ] Switch back to main:
  ```bash
  git checkout main
  ```
- [ ] Verify you're on main:
  ```bash
  git branch  # * should be next to main
  ```
- [ ] **Success**: On main branch, ready to strip features

---

### Task 3.2: Remove Auth Directories
**Effort**: 2/5
**Time**: 15 minutes

- [ ] Remove auth implementation:
  ```bash
  git rm -r templates/electron/src/main/auth/
  ```
- [ ] Remove auth UI components (if any):
  ```bash
  git rm -r templates/electron/src/renderer/components/auth/
  # Or wherever auth UI lives
  ```
- [ ] Remove auth tests:
  ```bash
  git rm -r templates/electron/src/main/__tests__/auth*
  ```
- [ ] Create placeholder README:
  ```bash
  mkdir -p templates/electron/src/features/auth
  cat > templates/electron/src/features/auth/README.md << 'EOF'
  # Authentication (Pro Tier)

  Authentication is available in **Manta Templates Pro**.

  ## What You Get in Pro

  - ✅ Auth0 integration (working out of the box)
  - ✅ Firebase authentication
  - ✅ Basic auth scaffold
  - ✅ Email verification
  - ✅ Password reset flows
  - ✅ Comprehensive OAuth guide (Electron-specific)

  ## Why Pro?

  OAuth in Electron is genuinely difficult. We spent 6+ hours solving:
  - Protocol handler registration (macOS, Windows, Linux)
  - Localhost callback servers
  - PKCE implementation
  - State parameter CSRF protection
  - Token storage and encryption

  [**Upgrade to Pro →**](https://manta.digital/pricing)

  ## DIY Alternative

  If you want to implement auth yourself:
  1. Read our free OAuth guide: docs/oauth-guide.md
  2. Use Auth0's Electron SDK (requires custom setup)
  3. Handle platform-specific protocol registration
  4. Implement secure token storage

  **Estimated time**: 6-12 hours for production-ready auth
  EOF
  git add templates/electron/src/features/auth/README.md
  ```
- [ ] **Success**: Auth code removed, helpful README added

---

### Task 3.3: Remove Payment Integration
**Effort**: 2/5
**Time**: 15 minutes

- [ ] Remove payments package:
  ```bash
  git rm -r packages/payments/
  ```
- [ ] Create placeholder:
  ```bash
  mkdir -p packages/payments
  cat > packages/payments/README.md << 'EOF'
  # Payment Processing (Pro Tier)

  Payment integration is available in **Manta Templates Pro**.

  ## What You Get in Pro

  - ✅ Lemon Squeezy integration (checkout, webhooks, customer portal)
  - ✅ Pre-built checkout components
  - ✅ Webhook handlers
  - ✅ License key validation
  - ✅ Customer email automation

  [**Upgrade to Pro →**](https://manta.digital/pricing)

  ## DIY Alternative

  Implement payment processing yourself:
  - Use Stripe Checkout (requires webhook setup)
  - Use Lemon Squeezy API (requires account + webhook config)
  - Handle license key generation
  - Build customer portal

  **Estimated time**: 4-6 hours
  EOF
  git add packages/payments/README.md
  ```
- [ ] **Success**: Payment code removed, README added

---

### Task 3.4: Remove Email, CAPTCHA, Uploads, Rate Limiting
**Effort**: 2/5
**Time**: 20 minutes

Follow same pattern for each package:

- [ ] Remove email integration:
  ```bash
  git rm -r packages/email/
  mkdir -p packages/email
  echo "# Email Integration (Pro Tier)\n\nSee Pro tier for Resend, SendGrid, and Postmark integrations.\n\n[Upgrade to Pro →](https://manta.digital/pricing)" > packages/email/README.md
  git add packages/email/README.md
  ```

- [ ] Remove CAPTCHA:
  ```bash
  git rm -r packages/captcha/
  mkdir -p packages/captcha
  echo "# CAPTCHA Protection (Pro Tier)\n\nCloudflare Turnstile, reCAPTCHA v3, and hCaptcha available in Pro.\n\n[Upgrade to Pro →](https://manta.digital/pricing)" > packages/captcha/README.md
  git add packages/captcha/README.md
  ```

- [ ] Remove file uploads:
  ```bash
  git rm -r packages/uploads/
  mkdir -p packages/uploads
  echo "# File Uploads (Pro Tier)\n\nUploadthing integration with drag-drop components in Pro.\n\n[Upgrade to Pro →](https://manta.digital/pricing)" > packages/uploads/README.md
  git add packages/uploads/README.md
  ```

- [ ] Remove rate limiting:
  ```bash
  git rm -r packages/rate-limiting/
  mkdir -p packages/rate-limiting
  echo "# Rate Limiting (Pro Tier)\n\nUpstash Redis rate limiting for API and form protection in Pro.\n\n[Upgrade to Pro →](https://manta.digital/pricing)" > packages/rate-limiting/README.md
  git add packages/rate-limiting/README.md
  ```

- [ ] **Success**: All Pro packages removed, upgrade prompts added

---

### Task 3.5: Clean Up Dependencies
**Effort**: 2/5
**Time**: 20 minutes

- [ ] Edit `templates/electron/package.json`:
  - Remove Auth0 SDK
  - Remove Lemon Squeezy SDK
  - Remove email service SDKs (Resend, SendGrid, Postmark)
  - Remove Uploadthing
  - Remove Upstash Redis
  - Remove CAPTCHA SDKs
  - Keep: React, Electron, Tailwind, Radix (core dependencies)

- [ ] Update `pnpm-workspace.yaml` (if packages are referenced):
  - Comment out Pro-only packages or use wildcards

- [ ] Run clean install to verify:
  ```bash
  cd templates/electron
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```

- [ ] Verify no missing dependency errors
- [ ] **Success**: package.json cleaned, dependencies install correctly

---

### Task 3.6: Update Code References
**Effort**: 3/5
**Time**: 30-45 minutes

Remove Pro feature references from core files:

- [ ] Edit `templates/electron/src/main/main.ts`:
  - Remove auth IPC handlers (`auth:login`, `auth:get-tokens`, etc.)
  - Remove payment IPC handlers
  - Remove any auth/payment imports
  - Add comment: `// Auth and payments available in Pro tier`

- [ ] Edit `templates/electron/src/preload/preload.ts`:
  - Remove auth API from `electronAPI`
  - Remove payment API
  - Keep only core APIs (window management, etc.)

- [ ] Edit `templates/electron/src/App.tsx`:
  - Remove auth UI components
  - Remove payment UI components
  - Add simple banner: "Want auth + payments? [Upgrade to Pro →](https://manta.digital/pricing)"

- [ ] Edit `.env.example`:
  - Remove Auth0 variables
  - Remove Lemon Squeezy variables
  - Remove email service variables
  - Add comment block:
    ```
    # ========================================
    # Pro Tier Features (Not in Free Tier)
    # ========================================
    # AUTH0_DOMAIN=
    # AUTH0_CLIENT_ID=
    # LEMON_SQUEEZY_API_KEY=
    # ... etc
    #
    # Get Pro tier: https://manta.digital/pricing
    ```

- [ ] **Success**: No broken imports, app runs without Pro features

---

### Task 3.7: Update Documentation
**Effort**: 2/5
**Time**: 30 minutes

- [ ] Edit `templates/electron/README.md`:
  ```markdown
  # Manta Electron Template (Free Tier)

  A production-ready Electron template with React, Tailwind, and Radix UI.

  ## What's Included (Free)

  - ✅ Electron + React setup
  - ✅ Tailwind CSS 4
  - ✅ Radix UI primitives
  - ✅ TypeScript strict mode
  - ✅ Hot reload (dev mode)
  - ✅ Production build setup

  ## What's in Pro ($149)

  - ✅ **Auth**: Auth0, Firebase, basic auth scaffold
  - ✅ **Payments**: Lemon Squeezy integration (checkout, webhooks)
  - ✅ **Email**: Resend, SendGrid, Postmark
  - ✅ **Forms**: CAPTCHA, file uploads, rate limiting
  - ✅ **Guides**: Comprehensive OAuth guide (6+ hours of research)
  - ✅ **All templates**: React, Next.js, Electron

  [**Upgrade to Pro →**](https://manta.digital/pricing)

  ## Quick Start

  ```bash
  pnpm install
  pnpm dev
  ```

  ## Build for Production

  ```bash
  pnpm build
  ```

  ## Need Auth or Payments?

  Check out [Manta Templates Pro](https://manta.digital/pricing) for production-ready
  auth, payments, email, and form utilities.
  ```

- [ ] Create migration guide: `templates/electron/UPGRADE_TO_PRO.md`:
  ```markdown
  # Upgrading to Pro Tier

  ## Why Upgrade?

  - Auth is hard in Electron (6+ hours to implement correctly)
  - Payment processing requires webhook infrastructure
  - Email, CAPTCHA, file uploads all require separate service integrations

  Pro tier gives you all of this, working out of the box, for $149.

  ## What You Get

  1. **Drop-in auth**: Auth0 + Firebase implementations (just add env vars)
  2. **Payment processing**: Lemon Squeezy checkout + webhooks + license keys
  3. **Email**: Three provider integrations (Resend, SendGrid, Postmark)
  4. **Form utilities**: CAPTCHA, file uploads, rate limiting
  5. **Documentation**: Comprehensive guides for Electron-specific challenges
  6. **All templates**: Same features in React, Next.js, Electron

  ## How to Upgrade

  1. Purchase Pro tier: [https://manta.digital/pricing](https://manta.digital/pricing)
  2. Receive license key via email
  3. Access private GitHub repo
  4. Clone and start building

  ## Questions?

  Email: support@manta.digital
  ```

- [ ] Add pricing page link to main README
- [ ] **Success**: Documentation clearly explains Free vs Pro

---

### Task 3.8: Test Free Tier
**Effort**: 2/5
**Time**: 20 minutes

- [ ] Clean build:
  ```bash
  cd templates/electron
  rm -rf node_modules dist
  pnpm install
  pnpm build
  ```
- [ ] Verify build succeeds with no errors
- [ ] Start dev mode:
  ```bash
  pnpm dev
  ```
- [ ] Verify app starts (no crashes from missing imports)
- [ ] Verify upgrade prompts are visible
- [ ] Check console for no errors
- [ ] **Success**: Free tier builds and runs cleanly

---

### Task 3.9: Commit Free Tier Changes
**Effort**: 1/5
**Time**: 10 minutes

- [ ] Review all changes:
  ```bash
  git status
  git diff
  ```
- [ ] Stage all changes:
  ```bash
  git add -A
  ```
- [ ] Commit with descriptive message:
  ```bash
  git commit -m "feat: create Free tier (strip Pro features)

  - Remove auth integration (Auth0, Firebase)
  - Remove payment processing (Lemon Squeezy)
  - Remove email integrations
  - Remove CAPTCHA, file uploads, rate limiting
  - Add upgrade prompts and documentation
  - Update README with Free vs Pro comparison

  Pro features available at: https://manta.digital/pricing

  Related: 060-arch.tiered-templates.md"
  ```
- [ ] Tag as Free tier:
  ```bash
  git tag -a v1.0.0-free -m "Free tier - base template only"
  ```
- [ ] Push to origin:
  ```bash
  git push origin main --tags
  ```
- [ ] **Success**: Free tier committed and pushed

---

## Phase 4: Verification

### Task 4.1: Verify Both Tiers Work
**Effort**: 2/5
**Time**: 30 minutes

**Test Free Tier**:
- [ ] Clone fresh copy:
  ```bash
  cd /tmp
  git clone https://github.com/manta-digital/manta-templates.git test-free
  cd test-free/templates/electron
  pnpm install
  pnpm build
  pnpm dev
  ```
- [ ] Verify app starts
- [ ] Verify no auth features
- [ ] Verify upgrade prompts visible
- [ ] Delete test directory

**Test Pro Tier**:
- [ ] Clone pro repo:
  ```bash
  cd /tmp
  git clone git@github.com:manta-digital/manta-templates-pro.git test-pro
  cd test-pro/templates/electron
  pnpm install
  pnpm build
  pnpm dev
  ```
- [ ] Verify app starts
- [ ] Verify auth features present (code exists)
- [ ] Verify payment features present
- [ ] Delete test directory

- [ ] **Success**: Both tiers verified working

---

### Task 4.2: Document Branch Workflow
**Effort**: 1/5
**Time**: 15 minutes

- [ ] Create `BRANCH_WORKFLOW.md` in project root:
  ```markdown
  # Branch Workflow: Free vs Pro Tiers

  ## Branch Structure

  - `main` → Free tier (public repo)
  - `pro` → Pro tier (private repo: manta-templates-pro)

  ## Development Workflow

  ### Adding a New Feature to Pro Tier

  1. Develop on `pro` branch:
     ```bash
     git checkout pro
     # ... make changes ...
     git commit -m "feat: add new feature"
     git push pro pro:main
     ```

  2. If feature should also be in Free:
     ```bash
     git checkout main
     git cherry-pick <commit-hash>
     git push origin main
     ```

  ### Syncing Free → Pro (Base Features)

  When you improve base template (not Pro features):

  1. Make changes on `main`:
     ```bash
     git checkout main
     # ... update base template ...
     git commit -m "fix: improve base component"
     git push origin main
     ```

  2. Merge into Pro:
     ```bash
     git checkout pro
     git merge main
     git push pro pro:main
     ```

  ### Adding New Pro-Only Feature

  1. Work on `pro` branch only
  2. Do NOT merge to `main`
  3. Document in Pro tier README

  ## Checkpoint Tags

  - `v1.0.0-checkpoint` - Pre-split state (all features)
  - `v1.0.0-free` - Free tier launch
  - `v1.0.0-pro` - Pro tier launch

  ## Recovery

  If something breaks, restore from checkpoint:
  ```bash
  git checkout v1.0.0-checkpoint
  git checkout -b recovery
  ```
  ```
- [ ] Commit to both branches
- [ ] **Success**: Workflow documented for future reference

---

## Phase 5: Final Checklist

### Task 5.1: Pre-Launch Verification
**Effort**: 2/5
**Time**: 30 minutes

- [ ] **Free Tier Checklist**:
  - [ ] Builds without errors
  - [ ] Runs in dev mode
  - [ ] No Pro features present
  - [ ] Upgrade prompts clear and helpful
  - [ ] README accurate
  - [ ] No sensitive env vars in .env.example

- [ ] **Pro Tier Checklist**:
  - [ ] All features from checkpoint present
  - [ ] Auth works (can test login)
  - [ ] Payment code present (if integrated)
  - [ ] Customer documentation clear
  - [ ] LICENSE.md present
  - [ ] Private repo access confirmed

- [ ] **Repository Setup**:
  - [ ] Public repo: `manta-templates` (Free)
  - [ ] Private repo: `manta-templates-pro` (Pro)
  - [ ] Tags pushed to both repos
  - [ ] Branch protection enabled (optional)

- [ ] **Success**: Both tiers ready for customers

---

## Success Criteria

**Free Tier**:
- ✅ Builds and runs without Pro dependencies
- ✅ Clear upgrade prompts in place
- ✅ No auth/payment code present
- ✅ Documentation explains Free vs Pro

**Pro Tier**:
- ✅ All features from checkpoint preserved
- ✅ Customer setup documentation complete
- ✅ License terms documented
- ✅ Private repo access working

**Process**:
- ✅ Both branches tagged and pushed
- ✅ Workflow documented for future updates
- ✅ Checkpoint preserved for rollback

---

## Estimated Total Time

**Total**: 6-8 hours (can be split across 2 days)

**Breakdown**:
- Phase 1 (Prep): 1 hour
- Phase 2 (Pro branch): 1 hour
- Phase 3 (Strip Free): 3-4 hours
- Phase 4 (Verification): 1 hour
- Phase 5 (Final checks): 30 min

---

## Rollback Plan

If anything goes wrong:

```bash
# Restore to checkpoint
git checkout v1.0.0-checkpoint
git checkout -b recovery

# Or reset main/pro branches
git checkout main
git reset --hard v1.0.0-checkpoint

git checkout pro
git reset --hard v1.0.0-checkpoint
```

Your checkpoint tag preserves the full working state.
