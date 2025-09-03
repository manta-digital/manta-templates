#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Remove project-documents/ entries from .gitignore to enable version control
 * Safe to run multiple times - no-op if line doesn't exist
 */
function enableProjectDocsVersionControl() {
  const gitignorePath = '.gitignore';
  
  try {
    if (!fs.existsSync(gitignorePath)) {
      console.log('No .gitignore file found - nothing to modify');
      return;
    }

    const content = fs.readFileSync(gitignorePath, 'utf8');
    const lines = content.split('\n');
    
    // Filter out any lines containing project-documents
    const filteredLines = lines.filter(line => 
      !line.trim().includes('project-documents/')
    );
    
    // Only write if something changed
    if (filteredLines.length !== lines.length) {
      fs.writeFileSync(gitignorePath, filteredLines.join('\n'));
      console.log('✅ Enabled project-documents/ for version control');
    } else {
      console.log('✅ project-documents/ already enabled for version control');
    }
    
  } catch (error) {
    console.error('Warning: Could not modify .gitignore:', error.message);
    // Don't fail the setup process for this
  }
}

// Run if called directly (ES module equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
  enableProjectDocsVersionControl();
}

export { enableProjectDocsVersionControl }; 