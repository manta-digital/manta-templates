/**
 * Legal Content Helper
 * 
 * Framework-agnostic helper for providing default legal content.
 * Supports multiple legal document types and preset configurations.
 */

import type { ContentData } from './types';

export type LegalContentType = 'legal' | 'privacy' | 'terms' | 'cookies';
export type LegalPreset = 'mit' | 'full';

/**
 * Legal content frontmatter interface
 */
export interface LegalFrontmatter {
  title: string;
  lastUpdated?: string;
  description?: string;
}

/**
 * Typed legal content data structure
 */
export type DefaultLegalContent = ContentData<LegalFrontmatter>;

/**
 * MIT preset legal content templates
 */
const MIT_LEGAL_CONTENT: Record<LegalContentType, DefaultLegalContent> = {
  legal: {
    slug: 'legal',
    frontmatter: {
      title: 'Legal Information'
    },
    contentHtml: `<p><em>Last updated: {{copyright.lastUpdated}}</em></p>

<h2>Software License</h2>
<p>The software available through this website is licensed under the <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided you keep the license notices and understand it is provided "as is".</p>

<p><strong>Full MIT License text and copyright details are available in the LICENSE file within the software repository.</strong></p>

<h2>Website Terms of Use</h2>

<h3>Acceptance of Terms</h3>
<p>By accessing <a href="{{site.url}}">{{site.url}}</a>, you agree to these terms. If you disagree with any part, please discontinue use.</p>

<h3>Intellectual Property</h3>
<p>Software is MIT‑licensed. Site content (words, images, design) is owned by {{copyright.holder}} unless otherwise noted. Follow page‑specific licenses where provided.</p>

<h3>Website Use</h3>
<p>This site is for information about our open-source software. Don't use it unlawfully or in ways that damage the site.</p>

<h3>Limitation of Liability</h3>
<p>The site and code are provided "as is" without warranties. We are not liable for damages from using the site or code.</p>

<h3>Modifications</h3>
<p>We may update these terms and will post changes here.</p>

<h2>Privacy Policy (Summary)</h2>
<p>We aim to keep things simple and private. We may collect basic analytics, voluntary contact information, and technical data needed for security/operation. We use reputable third‑party services (hosting, analytics, email). See their policies for details.</p>

<p>For data requests or questions, contact <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>

<blockquote>
<p>Note: This MIT pack text is a convenience, not legal advice.</p>
</blockquote>`,
    rawContent: `---
title: Legal Information
---

*Last updated: {{copyright.lastUpdated}}*

## Software License

The software available through this website is licensed under the **MIT License**. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided you keep the license notices and understand it is provided "as is".

**Full MIT License text and copyright details are available in the LICENSE file within the software repository.**

## Website Terms of Use

### Acceptance of Terms
By accessing {{site.url}}, you agree to these terms. If you disagree with any part, please discontinue use.

### Intellectual Property
Software is MIT‑licensed. Site content (words, images, design) is owned by {{copyright.holder}} unless otherwise noted. Follow page‑specific licenses where provided.

### Website Use
This site is for information about our open-source software. Don't use it unlawfully or in ways that damage the site.

### Limitation of Liability
The site and code are provided "as is" without warranties. We are not liable for damages from using the site or code.

### Modifications
We may update these terms and will post changes here.

## Privacy Policy (Summary)

We aim to keep things simple and private. We may collect basic analytics, voluntary contact information, and technical data needed for security/operation. We use reputable third‑party services (hosting, analytics, email). See their policies for details.

For data requests or questions, contact {{contacts.primaryEmail}}.

> Note: This MIT pack text is a convenience, not legal advice.`
  },
  
  privacy: {
    slug: 'privacy',
    frontmatter: {
      title: 'Privacy Policy'
    },
    contentHtml: `<p>We keep things simple and private. This site does not collect, store, or process personal information from visitors.</p>

<h3>Information We Don't Collect</h3>
<p>We do not use cookies for tracking, analytics, or advertising. We do not store personal data about your visit.</p>

<h3>Third-Party Services</h3>
<p>This site may be hosted by a third‑party provider and therefore be subject to their policies. We don't add extra tracking.</p>

<h3>Contact</h3>
<p>Questions? Email <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>

<blockquote>
<p>Note: This content pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice.</p>
</blockquote>`,
    rawContent: `---
title: Privacy Policy
---
We keep things simple and private. This site does not collect, store, or process personal information from visitors.

### Information We Don't Collect
We do not use cookies for tracking, analytics, or advertising. We do not store personal data about your visit.

### Third-Party Services
This site may be hosted by a third‑party provider and therefore be subject to their policies. We don't add extra tracking.

### Contact
Questions? Email {{contacts.primaryEmail}}.

> Note: This content pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice.`
  },

  terms: {
    slug: 'terms',
    frontmatter: {
      title: 'Terms of Service'
    },
    contentHtml: `<h3>What you can do</h3>
<ul>
<li>Unless specifically mentioned, the software in this template is MIT‑licensed. You can use it, change it, and sell things built with it. Any content with a specific license will provide that license with it.</li>
<li>Please keep any license files that come with code you reuse.</li>
</ul>

<h3>Site content (words, images, media)</h3>
<ul>
<li>Unless stated otherwise, site content is owned by {{author.name}}.</li>
<li>You're welcome to read and link to it. If you reuse content, follow the license on that page (if any) or ask first.</li>
</ul>

<h3>Privacy</h3>
<ul>
<li>We try to keep things simple and private. See the Privacy Policy for details.</li>
</ul>

<h3>No guarantees</h3>
<ul>
<li>The site and code are provided "as is." We try to be accurate, but we make no promises.</li>
</ul>

<h3>Contact</h3>
<p>Questions? Email <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>

<blockquote>
<p>Note: This content pack is provided as a convenience for MIT‑licensed sites/apps. It is not legal advice.</p>
</blockquote>`,
    rawContent: `---
title: Terms of Service
---
### What you can do
- Unless specifically mentioned, the software in this template is MIT‑licensed. You can use it, change it, and sell things built with it.  Any content with a specific license will provide that license with it.
- Please keep any license files that come with code you reuse.

### Site content (words, images, media)
- Unless stated otherwise, site content is owned by {{author.name}}.
- You're welcome to read and link to it. If you reuse content, follow the license on that page (if any) or ask first.

### Privacy
- We try to keep things simple and private. See the Privacy Policy for details.

### No guarantees
- The site and code are provided "as is." We try to be accurate, but we make no promises.

### Contact
Questions? Email {{contacts.primaryEmail}}.

> Note: This content pack is provided as a convenience for MIT‑licensed sites/apps. It is not legal advice.`
  },

  cookies: {
    slug: 'cookies',
    frontmatter: {
      title: 'Cookie Policy'
    },
    contentHtml: `<h3>Types of Cookies</h3>
<p>This site uses essential cookies only when required for secure operation. No analytics or advertising cookies are used.</p>

<h3>Managing Cookies</h3>
<p>You can control cookies through your browser settings.</p>

<h3>Contact</h3>
<p>Questions? Email <a href="mailto:{{contacts.supportEmail}}">{{contacts.supportEmail}}</a>.</p>

<blockquote>
<p>Note: This content pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice.</p>
</blockquote>`,
    rawContent: `---
title: Cookie Policy
---
### Types of Cookies
This site uses essential cookies only when required for secure operation. No analytics or advertising cookies are used.

### Managing Cookies
You can control cookies through your browser settings.

### Contact
Questions? Email {{contacts.supportEmail}}.

> Note: This content pack is provided as a convenience for MIT-licensed sites/apps. It is not legal advice.`
  }
};

/**
 * Full legal content templates (more comprehensive than MIT preset)
 */
const FULL_LEGAL_CONTENT: Record<LegalContentType, DefaultLegalContent> = {
  legal: {
    slug: 'legal',
    frontmatter: {
      title: 'Legal Information',
      description: 'Comprehensive legal information including terms, privacy, and licensing details'
    },
    contentHtml: `<p><em>Last updated: {{copyright.lastUpdated}}</em></p>

<h2>Terms of Service</h2>
<p>By using {{site.name}} (the "Service"), you agree to these Terms of Service ("Terms"). Please read them carefully.</p>

<h3>Acceptance of Terms</h3>
<p>By accessing and using this service at {{site.url}}, you accept and agree to be bound by the terms and provision of this agreement.</p>

<h3>Use License</h3>
<p>Permission is granted to temporarily download one copy of the materials on {{site.name}} for personal, non-commercial transitory viewing only.</p>

<h3>Disclaimer</h3>
<p>The materials on {{site.name}} are provided on an 'as is' basis. {{copyright.holder}} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>

<h2>Privacy Policy</h2>
<p>We value your privacy and are committed to protecting your personal information.</p>

<h3>Information Collection</h3>
<p>We may collect information you provide directly to us, such as when you contact us at {{contacts.primaryEmail}}.</p>

<h3>Use of Information</h3>
<p>We use collected information to provide, maintain, and improve our services, respond to your requests, and communicate with you.</p>

<h3>Information Sharing</h3>
<p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>

<h2>Cookie Policy</h2>
<p>We use cookies and similar technologies to enhance your experience on our website.</p>

<h3>What Are Cookies</h3>
<p>Cookies are small text files stored on your device when you visit our website.</p>

<h3>How We Use Cookies</h3>
<p>We use cookies for site functionality, analytics, and user preferences.</p>

<h2>Contact Information</h2>
<p>If you have questions about these terms, please contact us:</p>
<ul>
<li>Email: <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a></li>
<li>Address: {{contacts.address}}</li>
</ul>

<p><small>This document was last updated on {{copyright.lastUpdated}}.</small></p>`,
    rawContent: `---
title: Legal Information
description: Comprehensive legal information including terms, privacy, and licensing details
---

*Last updated: {{copyright.lastUpdated}}*

## Terms of Service

By using {{site.name}} (the "Service"), you agree to these Terms of Service ("Terms"). Please read them carefully.

### Acceptance of Terms
By accessing and using this service at {{site.url}}, you accept and agree to be bound by the terms and provision of this agreement.

### Use License
Permission is granted to temporarily download one copy of the materials on {{site.name}} for personal, non-commercial transitory viewing only.

### Disclaimer
The materials on {{site.name}} are provided on an 'as is' basis. {{copyright.holder}} makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.

## Privacy Policy

We value your privacy and are committed to protecting your personal information.

### Information Collection
We may collect information you provide directly to us, such as when you contact us at {{contacts.primaryEmail}}.

### Use of Information
We use collected information to provide, maintain, and improve our services, respond to your requests, and communicate with you.

### Information Sharing
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

## Cookie Policy

We use cookies and similar technologies to enhance your experience on our website.

### What Are Cookies
Cookies are small text files stored on your device when you visit our website.

### How We Use Cookies
We use cookies for site functionality, analytics, and user preferences.

## Contact Information

If you have questions about these terms, please contact us:
- Email: {{contacts.primaryEmail}}
- Address: {{contacts.address}}

*This document was last updated on {{copyright.lastUpdated}}.*`
  },

  privacy: {
    slug: 'privacy',
    frontmatter: {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your personal information'
    },
    contentHtml: `<p><em>Last updated: {{copyright.lastUpdated}}</em></p>

<h2>Information We Collect</h2>
<p>We may collect several types of information from and about users of our website:</p>
<ul>
<li>Personal information you provide directly</li>
<li>Usage information collected automatically</li>
<li>Information from third parties</li>
</ul>

<h2>How We Use Information</h2>
<p>We use information collected about you to:</p>
<ul>
<li>Provide and maintain our services</li>
<li>Communicate with you</li>
<li>Improve our website and services</li>
<li>Comply with legal obligations</li>
</ul>

<h2>Information Sharing</h2>
<p>We do not sell, trade, or rent your personal information to third parties. We may share information in certain circumstances:</p>
<ul>
<li>With your consent</li>
<li>To comply with legal requirements</li>
<li>To protect our rights and safety</li>
</ul>

<h2>Data Security</h2>
<p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

<h2>Your Rights</h2>
<p>You have rights regarding your personal information, including the right to access, update, or delete your information.</p>

<h2>Contact Us</h2>
<p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>`,
    rawContent: `---
title: Privacy Policy
description: How we collect, use, and protect your personal information
---

*Last updated: {{copyright.lastUpdated}}*

## Information We Collect

We may collect several types of information from and about users of our website:
- Personal information you provide directly
- Usage information collected automatically  
- Information from third parties

## How We Use Information

We use information collected about you to:
- Provide and maintain our services
- Communicate with you
- Improve our website and services
- Comply with legal obligations

## Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share information in certain circumstances:
- With your consent
- To comply with legal requirements
- To protect our rights and safety

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have rights regarding your personal information, including the right to access, update, or delete your information.

## Contact Us

If you have questions about this Privacy Policy, please contact us at {{contacts.primaryEmail}}.`
  },

  terms: {
    slug: 'terms',
    frontmatter: {
      title: 'Terms of Service',
      description: 'Terms and conditions for using our services'
    },
    contentHtml: `<p><em>Last updated: {{copyright.lastUpdated}}</em></p>

<h2>Acceptance of Terms</h2>
<p>By accessing and using {{site.name}}, you accept and agree to be bound by these Terms of Service.</p>

<h2>Description of Service</h2>
<p>{{site.name}} provides {{site.description}}.</p>

<h2>User Accounts</h2>
<p>You may need to create an account to use certain features. You are responsible for:</p>
<ul>
<li>Maintaining the confidentiality of your account</li>
<li>All activities under your account</li>
<li>Notifying us of unauthorized use</li>
</ul>

<h2>Acceptable Use</h2>
<p>You agree not to use the service to:</p>
<ul>
<li>Violate any applicable laws or regulations</li>
<li>Infringe on intellectual property rights</li>
<li>Transmit harmful or malicious code</li>
<li>Interfere with service operation</li>
</ul>

<h2>Intellectual Property</h2>
<p>The service and its original content are owned by {{copyright.holder}} and protected by intellectual property laws.</p>

<h2>Limitation of Liability</h2>
<p>{{copyright.holder}} shall not be liable for any indirect, incidental, special, or consequential damages.</p>

<h2>Termination</h2>
<p>We may terminate or suspend your access to the service at our discretion, with or without notice.</p>

<h2>Changes to Terms</h2>
<p>We reserve the right to modify these terms at any time. Changes will be posted on this page.</p>

<h2>Contact Information</h2>
<p>Questions about these Terms of Service should be sent to <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>`,
    rawContent: `---
title: Terms of Service
description: Terms and conditions for using our services
---

*Last updated: {{copyright.lastUpdated}}*

## Acceptance of Terms

By accessing and using {{site.name}}, you accept and agree to be bound by these Terms of Service.

## Description of Service

{{site.name}} provides {{site.description}}.

## User Accounts

You may need to create an account to use certain features. You are responsible for:
- Maintaining the confidentiality of your account
- All activities under your account
- Notifying us of unauthorized use

## Acceptable Use

You agree not to use the service to:
- Violate any applicable laws or regulations
- Infringe on intellectual property rights
- Transmit harmful or malicious code
- Interfere with service operation

## Intellectual Property

The service and its original content are owned by {{copyright.holder}} and protected by intellectual property laws.

## Limitation of Liability

{{copyright.holder}} shall not be liable for any indirect, incidental, special, or consequential damages.

## Termination

We may terminate or suspend your access to the service at our discretion, with or without notice.

## Changes to Terms

We reserve the right to modify these terms at any time. Changes will be posted on this page.

## Contact Information

Questions about these Terms of Service should be sent to {{contacts.primaryEmail}}.`
  },

  cookies: {
    slug: 'cookies', 
    frontmatter: {
      title: 'Cookie Policy',
      description: 'How we use cookies and similar technologies'
    },
    contentHtml: `<p><em>Last updated: {{copyright.lastUpdated}}</em></p>

<h2>What Are Cookies</h2>
<p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.</p>

<h2>Types of Cookies We Use</h2>
<h3>Essential Cookies</h3>
<p>These are necessary for the website to function and cannot be switched off.</p>

<h3>Analytics Cookies</h3>
<p>These help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>

<h3>Preference Cookies</h3>
<p>These enable the website to remember information that changes how it behaves or looks, like your preferred language or region.</p>

<h2>Managing Cookies</h2>
<p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and set most browsers to prevent them from being placed.</p>

<h2>Third-Party Cookies</h2>
<p>We may use third-party services that set cookies on your behalf. These are governed by the respective third parties' privacy policies.</p>

<h2>Changes to This Policy</h2>
<p>We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

<h2>Contact Us</h2>
<p>If you have questions about our use of cookies, please contact us at <a href="mailto:{{contacts.primaryEmail}}">{{contacts.primaryEmail}}</a>.</p>`,
    rawContent: `---
title: Cookie Policy  
description: How we use cookies and similar technologies
---

*Last updated: {{copyright.lastUpdated}}*

## What Are Cookies

Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience.

## Types of Cookies We Use

### Essential Cookies
These are necessary for the website to function and cannot be switched off.

### Analytics Cookies  
These help us understand how visitors interact with our website by collecting and reporting information anonymously.

### Preference Cookies
These enable the website to remember information that changes how it behaves or looks, like your preferred language or region.

## Managing Cookies

You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and set most browsers to prevent them from being placed.

## Third-Party Cookies

We may use third-party services that set cookies on your behalf. These are governed by the respective third parties' privacy policies.

## Changes to This Policy

We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## Contact Us

If you have questions about our use of cookies, please contact us at {{contacts.primaryEmail}}.`
  }
};

/**
 * Get default legal content for a specific type and preset
 * 
 * @param type - The type of legal document to retrieve
 * @param preset - The preset configuration ('mit' for simple, 'full' for comprehensive)
 * @returns Default legal content data ready for use
 * 
 * @example
 * ```typescript
 * // Get MIT preset privacy policy
 * const privacy = getDefaultLegalContent('privacy', 'mit');
 * 
 * // Get full terms of service
 * const terms = getDefaultLegalContent('terms', 'full');
 * 
 * // Use with token interpolation
 * const legal = getDefaultLegalContent('legal', 'mit');
 * // Content includes tokens like {{copyright.lastUpdated}} ready for replacement
 * ```
 */
export function getDefaultLegalContent(
  type: LegalContentType,
  preset: LegalPreset = 'mit'
): DefaultLegalContent {
  const contentMap = preset === 'mit' ? MIT_LEGAL_CONTENT : FULL_LEGAL_CONTENT;
  
  const content = contentMap[type];
  if (!content) {
    throw new Error(`Unknown legal content type: ${type}`);
  }
  
  // Return a copy to prevent mutations
  return {
    ...content,
    frontmatter: { ...content.frontmatter }
  };
}