#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Simple copy script to replace the complex sync-template.js
 * Copies packages/src/lib to templates/{template}/src/lib based on build tool
 * 
 * Usage: node scripts/copy-packages.js [template-name]
 * Example: node scripts/copy-packages.js react
 */

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const PACKAGES_SOURCE = path.join(__dirname, '..', 'packages', 'src', 'lib');

// Build tool to adapter mapping
const ADAPTER_MAPPING = {
  'nextjs': 'nextjs',    // Next.js uses nextjs adapter
  'react': 'vite',       // React uses vite adapter  
  'electron': 'vite'     // Electron uses vite adapter
};

function copyPackages(templateName) {
  const templateDir = path.join(TEMPLATES_DIR, templateName);
  const templateLibDir = path.join(templateDir, 'src', 'lib');
  
  if (!fs.existsSync(templateDir)) {
    console.error(`❌ Template not found: ${templateDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(PACKAGES_SOURCE)) {
    console.error(`❌ Packages source not found: ${PACKAGES_SOURCE}`);
    process.exit(1);
  }

  const adapterName = ADAPTER_MAPPING[templateName];
  if (!adapterName) {
    console.error(`❌ Unknown template: ${templateName}. Supported: ${Object.keys(ADAPTER_MAPPING).join(', ')}`);
    process.exit(1);
  }

  console.log(`🚀 Copying packages to template: ${templateName}`);

  // Create src/lib directory in template
  if (!fs.existsSync(templateLibDir)) {
    fs.mkdirSync(templateLibDir, { recursive: true });
  }

  // Copy ui-core
  const uiCoreSource = path.join(PACKAGES_SOURCE, 'ui-core');
  const uiCoreTarget = path.join(templateLibDir, 'ui-core');
  console.log(`📦 Copying ui-core: ${uiCoreSource} → ${uiCoreTarget}`);
  if (fs.existsSync(uiCoreTarget)) {
    execSync(`rm -rf "${uiCoreTarget}"`);
  }
  execSync(`cp -r "${uiCoreSource}" "${uiCoreTarget}"`);
  
  // Remove all test directories from ui-core
  console.log(`🗑️  Removing test files from ui-core`);
  execSync(`find "${uiCoreTarget}" -name "__tests__" -type d -exec rm -rf {} + || true`);
  execSync(`find "${uiCoreTarget}" -name "*.test.*" -type f -delete || true`);

  // Copy appropriate ui-adapter
  const adapterSource = path.join(PACKAGES_SOURCE, 'ui-adapters', adapterName);
  const adapterTarget = path.join(templateLibDir, 'ui-adapters');
  if (fs.existsSync(adapterSource)) {
    console.log(`📦 Copying ${adapterName} adapter: ${adapterSource} → ${adapterTarget}`);
    if (fs.existsSync(adapterTarget)) {
      execSync(`rm -rf "${adapterTarget}"`);
    }
    fs.mkdirSync(adapterTarget, { recursive: true });
    execSync(`cp -r "${adapterSource}" "${adapterTarget}"`);
    
    // Remove all test directories from adapter
    console.log(`🗑️  Removing test files from ${adapterName} adapter`);
    execSync(`find "${adapterTarget}" -name "__tests__" -type d -exec rm -rf {} + || true`);
    execSync(`find "${adapterTarget}" -name "*.test.*" -type f -delete || true`);
    
    // Also copy ui-adapters index.ts if it exists
    const adaptersIndexSource = path.join(PACKAGES_SOURCE, 'ui-adapters', 'index.ts');
    const adaptersIndexTarget = path.join(templateLibDir, 'ui-adapters', 'index.ts');
    if (fs.existsSync(adaptersIndexSource)) {
      console.log(`📦 Copying ui-adapters index: ${adaptersIndexSource} → ${adaptersIndexTarget}`);
      execSync(`cp "${adaptersIndexSource}" "${adaptersIndexTarget}"`);
    }
  } else {
    console.warn(`⚠️  Adapter not found: ${adapterSource}`);
  }

  // Copy content
  const contentSource = path.join(PACKAGES_SOURCE, 'content');
  const contentTarget = path.join(templateDir, 'content');
  if (fs.existsSync(contentSource)) {
    console.log(`📝 Copying content: ${contentSource} → ${contentTarget}`);
    if (fs.existsSync(contentTarget)) {
      execSync(`rm -rf "${contentTarget}"/*`);
    } else {
      fs.mkdirSync(contentTarget, { recursive: true });
    }
    execSync(`cp -r "${contentSource}"/* "${contentTarget}/"`);
  }

  console.log(`✅ Template ${templateName} updated successfully!`);
  console.log(`📁 Packages copied to: ${templateLibDir}`);
  console.log(`📁 Content copied to: ${contentTarget}`);
}

// Main execution
const templateName = process.argv[2];

if (!templateName) {
  console.error('❌ Please specify a template name');
  console.log('Usage: node scripts/copy-packages.js [template-name]');
  console.log(`Supported templates: ${Object.keys(ADAPTER_MAPPING).join(', ')}`);
  process.exit(1);
}

try {
  copyPackages(templateName);
} catch (error) {
  console.error(`❌ Copy failed: ${error.message}`);
  process.exit(1);
}