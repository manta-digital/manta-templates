#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Sync script to copy ui-core and ui-adapters packages into templates for distribution
 * Usage: node scripts/sync-template.js [template-name]
 * Example: node scripts/sync-template.js nextjs
 */

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');
const PACKAGES_DIR = path.join(__dirname, '..', 'packages');

function syncTemplate(templateName) {
  const templateDir = path.join(TEMPLATES_DIR, templateName);
  const uiCoreSource = path.join(PACKAGES_DIR, 'ui-core', 'src');
  const uiAdaptersSource = path.join(PACKAGES_DIR, 'ui-adapters', templateName, 'src');
  
  if (!fs.existsSync(templateDir)) {
    console.error(`❌ Template not found: ${templateDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(uiCoreSource)) {
    console.error(`❌ ui-core source not found: ${uiCoreSource}`);
    process.exit(1);
  }

  console.log(`🚀 Syncing packages to template: ${templateName}`);

  // Create src/lib directory in template
  const libDir = path.join(templateDir, 'src', 'lib');
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  // Copy ui-core using system cp command for reliability
  const uiCoreTarget = path.join(libDir, 'ui-core');
  console.log(`📦 Copying ui-core: ${uiCoreSource} → ${uiCoreTarget}`);
  
  // Remove existing and copy fresh
  if (fs.existsSync(uiCoreTarget)) {
    execSync(`rm -rf "${uiCoreTarget}"`);
  }
  execSync(`cp -r "${uiCoreSource}" "${uiCoreTarget}"`);

  // Copy ui-adapters if it exists
  if (fs.existsSync(uiAdaptersSource)) {
    const uiAdaptersTarget = path.join(libDir, 'ui-adapters');
    console.log(`📦 Copying ui-adapters: ${uiAdaptersSource} → ${uiAdaptersTarget}`);
    
    if (fs.existsSync(uiAdaptersTarget)) {
      execSync(`rm -rf "${uiAdaptersTarget}"`);
    }
    execSync(`cp -r "${uiAdaptersSource}" "${uiAdaptersTarget}"`);
    
    // Fix imports within ui-adapters to reference local ui-core
    console.log(`🔧 Updating imports within ui-adapters...`);
    execSync(`find "${uiAdaptersTarget}" -type f \\( -name "*.ts" -o -name "*.tsx" \\) -exec sed -i '' "s|@manta-templates/ui-core|@/lib/ui-core|g" {} +`);
    
    // Fix content provider configuration to use local paths
    const contentIndexPath = path.join(uiAdaptersTarget, 'content', 'index.ts');
    if (fs.existsSync(contentIndexPath)) {
      let contentIndexContent = fs.readFileSync(contentIndexPath, 'utf8');
      
      // Replace the additionalContentRoots array with local lib paths
      const newContentRoots = `additionalContentRoots: [
    // Local ui-adapters content directory
    path.join(process.cwd(), 'lib/ui-adapters/content'),
    // Fallback to src/content for template-specific content
    path.join(process.cwd(), 'src/content'),
  ]`;
      
      contentIndexContent = contentIndexContent.replace(
        /additionalContentRoots:\s*\[[\s\S]*?\]/m,
        newContentRoots
      );
      
      fs.writeFileSync(contentIndexPath, contentIndexContent);
      console.log(`📝 Updated content provider configuration`);
    }
  }

  // For React template, also copy Vite adapter 
  if (templateName === 'react') {
    const viteAdapterSource = path.join(PACKAGES_DIR, 'ui-adapters', 'vite');
    if (fs.existsSync(viteAdapterSource)) {
      const viteAdapterTarget = path.join(libDir, 'ui-adapters', 'vite');
      console.log(`📦 Copying Vite adapter: ${viteAdapterSource} → ${viteAdapterTarget}`);
      
      if (fs.existsSync(viteAdapterTarget)) {
        execSync(`rm -rf "${viteAdapterTarget}"`);
      }
      
      // Copy only the TypeScript files, not node_modules 
      fs.mkdirSync(viteAdapterTarget, { recursive: true });
      execSync(`cp "${viteAdapterSource}"/*.ts "${viteAdapterTarget}"/`);
      
      // Fix imports within vite adapter to reference local ui-core
      console.log(`🔧 Updating imports within Vite adapter...`);
      execSync(`find "${viteAdapterTarget}" -type f \\( -name "*.ts" -o -name "*.tsx" \\) -exec sed -i '' "s|@manta-templates/ui-core|@/lib/ui-core|g" {} +`);
    }
  }

  // Copy content from packages/content/src to template content directory
  syncContent(templateName, templateDir);

  // Update package.json to remove workspace dependencies
  updatePackageJson(templateDir);

  // Update import paths to use local lib
  updateImportPaths(templateDir, templateName);

  console.log(`✅ Template ${templateName} synced successfully!`);
  console.log(`📁 UI packages copied to: ${path.join(templateDir, 'src', 'lib')}`);
}

function syncContent(templateName, templateDir) {
  const contentSource = path.join(PACKAGES_DIR, 'content', 'src');
  const contentTarget = path.join(templateDir, 'content');
  
  if (!fs.existsSync(contentSource)) {
    console.warn(`⚠️  No content source found: ${contentSource}`);
    return;
  }

  console.log(`📝 Copying content: ${contentSource} → ${contentTarget}`);
  
  // Create content directory in template
  if (!fs.existsSync(contentTarget)) {
    fs.mkdirSync(contentTarget, { recursive: true });
  }
  
  // Remove existing content and copy fresh
  if (fs.existsSync(contentTarget)) {
    execSync(`rm -rf "${contentTarget}"/*`);
  }
  execSync(`cp -r "${contentSource}"/* "${contentTarget}"/`);
  
  console.log(`📁 Content copied to: ${contentTarget}`);
}

function updatePackageJson(templateDir) {
  const packageJsonPath = path.join(templateDir, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.warn(`⚠️  No package.json found at: ${packageJsonPath}`);
    return;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  let modified = false;

  // Remove workspace dependencies
  if (packageJson.dependencies) {
    const workspaceDeps = Object.keys(packageJson.dependencies).filter(dep => 
      packageJson.dependencies[dep].startsWith('workspace:')
    );
    
    if (workspaceDeps.length > 0) {
      console.log(`🔧 Removing workspace dependencies: ${workspaceDeps.join(', ')}`);
      workspaceDeps.forEach(dep => {
        delete packageJson.dependencies[dep];
      });
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`📝 Updated package.json`);
  }
}

function getCSSFilePath(templateDir, templateName) {
  const srcDir = path.join(templateDir, 'src');
  
  // Template-specific CSS file paths
  const possiblePaths = [
    path.join(srcDir, 'app', 'globals.css'), // NextJS
    path.join(srcDir, 'index.css'),          // React, Electron
    path.join(srcDir, 'main.css'),           // Alternative
  ];
  
  // Find the first existing CSS file
  for (const cssPath of possiblePaths) {
    if (fs.existsSync(cssPath)) {
      return cssPath;
    }
  }
  
  return null;
}

function getTemplateSpecificConfig(templateName) {
  // Template-specific configuration
  const templateConfigs = {
    'nextjs': {
      uiAdaptersPackage: '@manta-templates/ui-adapters-nextjs',
      additionalAdapters: [],
      supportedFeatures: ['ssr', 'app-router']
    },
    'react': {
      uiAdaptersPackage: '@manta-templates/ui-adapters-react',
      additionalAdapters: ['vite'], // React needs Vite adapter
      supportedFeatures: ['vite', 'spa']
    },
    'electron': {
      uiAdaptersPackage: '@manta-templates/ui-adapters-electron',
      additionalAdapters: [],
      supportedFeatures: ['desktop', 'main-renderer']
    }
  };
  
  // Return template config or default
  return templateConfigs[templateName] || {
    uiAdaptersPackage: `@manta-templates/ui-adapters-${templateName}`,
    additionalAdapters: [],
    supportedFeatures: []
  };
}

function updateImportPaths(templateDir, templateName) {
  console.log('🔧 Updating import paths to use local lib...');
  
  const srcDir = path.join(templateDir, 'src');
  const templateConfig = getTemplateSpecificConfig(templateName);
  
  // Update TypeScript/JavaScript files
  try {
    // Update ui-core imports (same for all templates)
    execSync(`find "${srcDir}" -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i '' "s|@manta-templates/ui-core|@/lib/ui-core|g" {} +`);
    
    // Update template-specific ui-adapters imports
    execSync(`find "${srcDir}" -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i '' "s|${templateConfig.uiAdaptersPackage}|@/lib/ui-adapters|g" {} +`);
    
    // Also update any @/lib/utils imports to use ui-core utils  
    execSync(`find "${srcDir}" -type f \\( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \\) -exec sed -i '' "s|@/lib/utils|@/lib/ui-core/utils|g" {} +`);
    
    console.log(`📝 Updated TypeScript/JavaScript import paths for ${templateName} template`);
  } catch (error) {
    console.warn('⚠️  Warning: Could not update some import paths');
  }

  // Update CSS import in main CSS file (dynamic detection)
  const cssFilePath = getCSSFilePath(templateDir, templateName);
  if (cssFilePath) {
    const cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // Calculate relative path from CSS file to ui-core styles (now in src/lib)
    const cssFileName = path.basename(cssFilePath);
    const relativePath = cssFilePath.includes('app/globals.css') 
      ? '../lib/ui-core/styles/index.css'       // NextJS: src/app/globals.css -> src/lib/ui-core/styles/
      : './lib/ui-core/styles/index.css';       // React/Electron: src/index.css -> src/lib/ui-core/styles/
    
    const updatedContent = cssContent.replace(
      /@import "@manta-templates\/ui-core\/dist\/styles\/index\.css";/g,
      `@import "${relativePath}";`
    );
    
    if (updatedContent !== cssContent) {
      fs.writeFileSync(cssFilePath, updatedContent);
      console.log(`📝 Updated CSS import path in ${cssFileName}`);
    }
  } else {
    console.warn('⚠️  Warning: No main CSS file found for import path updates');
  }

  // Update tsconfig.json and eslint.config.mjs
  updateProjectConfig(templateDir);
}

function updateProjectConfig(templateDir) {
  console.log('🔧 Updating project configuration...');

  // Update tsconfig.json
  const tsconfigPath = path.join(templateDir, 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
    
    // Add lib path mapping
    if (!tsconfig.compilerOptions) tsconfig.compilerOptions = {};
    if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
    
    tsconfig.compilerOptions.paths["@/lib/*"] = ["./src/lib/*"];
    
    // Exclude src/lib directory
    if (!tsconfig.exclude) tsconfig.exclude = [];
    if (!tsconfig.exclude.includes("src/lib")) {
      tsconfig.exclude.push("src/lib");
    }

    fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n');
    console.log('📝 Updated tsconfig.json');
  }

  // Update eslint.config.mjs
  const eslintConfigPath = path.join(templateDir, 'eslint.config.mjs');
  if (fs.existsSync(eslintConfigPath)) {
    let eslintContent = fs.readFileSync(eslintConfigPath, 'utf8');
    
    // Add src/lib ignore if not present
    if (!eslintContent.includes('ignores: ["src/lib/**/*"]')) {
      const insertPoint = eslintContent.indexOf('const eslintConfig = [');
      if (insertPoint !== -1) {
        const beforeInsert = eslintContent.substring(0, insertPoint);
        const afterInsert = eslintContent.substring(insertPoint);
        
        const updatedAfterInsert = afterInsert.replace(
          /const eslintConfig = \[\n  \.\.\.compat\.extends\([^)]+\),\n\];/,
          `const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["src/lib/**/*"],
  },
];`
        );

        if (updatedAfterInsert !== afterInsert) {
          fs.writeFileSync(eslintConfigPath, beforeInsert + updatedAfterInsert);
          console.log('📝 Updated eslint.config.mjs');
        }
      }
    }
  }
}

// Main execution
const templateName = process.argv[2];

if (!templateName) {
  console.error('❌ Please specify a template name');
  console.log('Usage: node scripts/sync-template.js [template-name]');
  console.log('Example: node scripts/sync-template.js nextjs');
  process.exit(1);
}

try {
  syncTemplate(templateName);
} catch (error) {
  console.error(`❌ Sync failed: ${error.message}`);
  process.exit(1);
}