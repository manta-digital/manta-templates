#!/usr/bin/env node
/**
 * Template Upgrade Script
 * 
 * Upgrades an existing manta-template deployment to the latest version
 * Usage: node scripts/upgrade-template.js [template-type] [target-directory]
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const TEMPLATE_TYPES = ['react', 'nextjs', 'electron'];

async function upgradeTemplate(templateType, targetDir) {
  console.log(`🚀 Upgrading ${templateType} template in ${targetDir}`);
  
  const templateDir = path.join(process.cwd(), 'templates', templateType);
  const targetPackageJson = path.join(targetDir, 'package.json');
  const templatePackageJson = path.join(templateDir, 'package.json');
  
  // 1. Compare package.json dependencies
  console.log('📦 Analyzing dependencies...');
  const currentPkg = JSON.parse(await fs.readFile(targetPackageJson, 'utf8'));
  const templatePkg = JSON.parse(await fs.readFile(templatePackageJson, 'utf8'));
  
  const missingDeps = findMissingDependencies(currentPkg, templatePkg);
  
  if (missingDeps.length > 0) {
    console.log('📥 Installing missing dependencies:');
    missingDeps.forEach(dep => console.log(`  + ${dep}`));
    
    try {
      execSync(`cd ${targetDir} && pnpm add ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('❌ Failed to install dependencies:', error.message);
      return false;
    }
  }
  
  // 2. Copy ui-core components from packages
  console.log('🎨 Updating ui-core components...');
  const packagesUiCore = path.join(process.cwd(), 'packages', 'src', 'lib', 'ui-core');
  const targetUiCore = path.join(targetDir, 'src', 'lib', 'ui-core');
  
  try {
    await copyDirectory(packagesUiCore, targetUiCore);
    console.log('✅ ui-core components updated');
  } catch (error) {
    console.error('❌ Failed to copy ui-core:', error.message);
    return false;
  }
  
  // 3. Copy ui-adapters if they exist
  const packagesAdapters = path.join(process.cwd(), 'packages', 'src', 'lib', 'ui-adapters');
  const targetAdapters = path.join(targetDir, 'src', 'lib', 'ui-adapters');
  
  try {
    if (await exists(packagesAdapters)) {
      await copyDirectory(packagesAdapters, targetAdapters);
      console.log('✅ ui-adapters updated');
    }
  } catch (error) {
    console.warn('⚠️  Could not update ui-adapters:', error.message);
  }
  
  // 4. Check for config updates (warn only)
  await checkConfigUpdates(templateDir, targetDir);
  
  // 5. Test build
  console.log('🔧 Testing build...');
  try {
    execSync(`cd ${targetDir} && pnpm build`, { stdio: 'inherit' });
    console.log('✅ Build successful!');
  } catch (error) {
    console.error('❌ Build failed. Manual intervention needed.');
    return false;
  }
  
  console.log('🎉 Template upgrade completed successfully!');
  return true;
}

function findMissingDependencies(current, template) {
  const missing = [];
  
  // Check regular dependencies
  Object.entries(template.dependencies || {}).forEach(([name, version]) => {
    if (!current.dependencies?.[name]) {
      missing.push(`${name}@${version}`);
    }
  });
  
  // Check devDependencies  
  Object.entries(template.devDependencies || {}).forEach(([name, version]) => {
    if (!current.devDependencies?.[name]) {
      missing.push(`-D ${name}@${version}`);
    }
  });
  
  return missing;
}

async function copyDirectory(src, dest) {
  await fs.rm(dest, { recursive: true, force: true });
  await fs.cp(src, dest, { recursive: true });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function checkConfigUpdates(templateDir, targetDir) {
  const configFiles = ['tsconfig.json', 'vite.config.ts', '.eslintrc.json'];
  
  for (const file of configFiles) {
    const templateConfig = path.join(templateDir, file);
    const targetConfig = path.join(targetDir, file);
    
    if (await exists(templateConfig) && await exists(targetConfig)) {
      const templateContent = await fs.readFile(templateConfig, 'utf8');
      const targetContent = await fs.readFile(targetConfig, 'utf8');
      
      if (templateContent !== targetContent) {
        console.log(`⚠️  ${file} differs from template version. Manual review recommended.`);
      }
    }
  }
}

// CLI interface
if (process.argv.length < 4) {
  console.log('Usage: node scripts/upgrade-template.js [template-type] [target-directory]');
  console.log('Template types:', TEMPLATE_TYPES.join(', '));
  process.exit(1);
}

const [,, templateType, targetDir] = process.argv;

if (!TEMPLATE_TYPES.includes(templateType)) {
  console.error('Invalid template type. Options:', TEMPLATE_TYPES.join(', '));
  process.exit(1);
}

upgradeTemplate(templateType, targetDir).catch(console.error);