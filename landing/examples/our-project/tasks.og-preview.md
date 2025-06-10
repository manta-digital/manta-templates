# Open Graph Preview for Facebook - Next.js Landing Page

### 1. Investigate Facebook Open Graph Requirements & Debugging
- [ ] Research Facebook's specific Open Graph (OG) tag requirements and best practices.
  - [ ] Identify mandatory OG tags for optimal Facebook display (e.g., `og:title`, `og:description`, `og:image`, `og:url`, `og:type`).
  - [ ] Check Facebook's recommended image dimensions and aspect ratios for `og:image`.
  - [ ] Understand requirements for `fb:app_id` if applicable.
- [ ] Use Facebook's Sharing Debugger tool to analyze the current landing page URL.
  - [ ] Input the landing page URL into the Facebook Sharing Debugger.
  - [ ] Document all errors and warnings reported by the debugger.
  - [ ] Note which OG tags are being picked up and which are missing or incorrect.
- [ ] Compare current OG tags in `app/layout.tsx` or `app/page.tsx` with Facebook's requirements.
  - [ ] Identify discrepancies and missing tags.
  - [ ] Success: A clear list of issues, missing tags, and incorrect OG properties is documented.

### 2. Implement Open Graph Tag Updates
- [x] Modify the Next.js application's metadata to include/update necessary OG tags for Facebook.
  - [x] Locate the metadata generation logic (likely in `app/layout.tsx`, `app/page.tsx`, or `src/app/page.tsx`).
  - [x] Add/Update `og:title` to be concise and compelling.
  - [x] Add/Update `og:description` to be informative and engaging.
  - [x] Add/Update `og:url` to be the canonical URL of the landing page.
  - [x] Add/Update `og:type` (e.g., `website`).
  - [x] Ensure a high-quality `og:image` is specified.
    1.  [x] Verify the image URL is absolute and accessible by Facebook's crawler.
    2.  [x] Ensure image dimensions meet Facebook's recommendations (e.g., 1200×630 pixels).
    3.  [x] Consider providing `og:image:width` and `og:image:height` tags.
  - [ ] Add `fb:app_id` if a Facebook App ID is available.
  - [x] Ensure all OG tag values are dynamic if page content changes, or static if appropriate.
- [x] For Next.js 15, utilize the App Router Metadata API.
  - [x] Define a `metadata: Metadata` export in `app/layout.tsx` or `app/page.tsx`.
  - [x] Populate the `openGraph` field with the required OG properties.
  - [x] Success: All required OG tags are correctly implemented via the Metadata API.

### 3. Test and Validate Open Graph Preview
- [x] Re-test the landing page URL with Facebook's Sharing Debugger.
  - [x] Click "Scrape Again" to fetch the updated OG tags.
  - [x] Verify that all previous errors and warnings are resolved.
  - [x] Confirm the preview in the debugger matches the intended appearance.
- [x] Test sharing the landing page link directly in a Facebook post (set visibility to "Only Me").
  - [x] Check how the preview appears in an actual Facebook environment.
  - [x] Ensure the title, description, and image are displayed correctly.
- [x] (Optional) Test other platforms (Twitter, LinkedIn) to ensure compatibility.
  - [x] Use Twitter Card Validator and LinkedIn Post Inspector.
  - [x] Success: Previews render correctly across major platforms.

