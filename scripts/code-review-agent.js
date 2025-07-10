#!/usr/bin/env node

/**
 * Automated Code Review Agent
 * 
 * This script performs comprehensive code reviews across the entire project codebase,
 * generating review documents and task lists according to the guidelines in `.cursor/rules/review.md`.
 * 
 * Usage:
 *   node scripts/code-review-agent.js [options]
 * 
 * Options:
 *   --depth=quick|standard|deep    Review depth (default: standard)
 *   --format=markdown|json|html    Output format (default: markdown)
 *   --filter=filetype              Review only specific file types
 *   --dir=path                     Limit to specific directory
 *   --max-size=size                Skip files larger than size (in KB)
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  reviewGuidelinesPath: '.cursor/rules/review.md',
  outputBasePath: 'project-documents/our-project/code-reviews',
  dateFormat: 'MMDD',
  maxFileSize: 500, // KB
  parallelLimit: 5,
  reviewDepth: 'standard',
  outputFormat: 'markdown'
};

// Project type detection patterns
const PROJECT_PATTERNS = {
  nextjs: {
    indicators: ['next.config.js', 'next.config.ts', 'package.json'],
    directories: ['app', 'src/app', 'components', 'lib', 'types'],
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.scss', '.mdx']
  },
  python: {
    indicators: ['requirements.txt', 'pyproject.toml', 'setup.py'],
    directories: ['src', 'app', 'tests', 'migrations'],
    extensions: ['.py', '.pyx', '.pyi']
  },
  cpp: {
    indicators: ['CMakeLists.txt', 'Makefile'],
    directories: ['src', 'include', 'lib', 'tests'],
    extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp', '.hxx']
  },
  rust: {
    indicators: ['Cargo.toml', 'Cargo.lock'],
    directories: ['src', 'tests', 'examples'],
    extensions: ['.rs']
  },
  generic: {
    indicators: [],
    directories: ['src', 'app', 'lib', 'components'],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.py', '.cpp', '.h', '.rs', '.go', '.java']
  }
};

// Review criteria from guidelines
const REVIEW_CRITERIA = {
  1: 'Potential Bugs & Edge Cases',
  2: 'Hard-coded Elements',
  3: 'Artificial Constraints',
  4: 'Code Duplication & Reuse',
  5: 'Component Structure',
  6: 'Design Patterns & Best Practices',
  7: 'Type Safety & Documentation',
  8: 'Performance Considerations',
  9: 'Security Considerations',
  10: 'Testing Coverage',
  11: 'Accessibility & User Experience',
  12: 'React, TypeScript, and NextJS specific'
};

class CodeReviewAgent {
  constructor(options = {}) {
    this.options = { ...CONFIG, ...options };
    this.projectType = null;
    this.sourceFiles = [];
    this.reviewGuidelines = null;
    this.reviewDate = this.getCurrentDate();
  }

  async run() {
    console.log('🚀 Starting Automated Code Review Agent...');
    
    try {
      // Step 1: Project Analysis
      await this.analyzeProject();
      
      // Step 2: Load Review Guidelines
      await this.loadReviewGuidelines();
      
      // Step 3: Discover Source Files
      await this.discoverSourceFiles();
      
      // Step 4: Perform Reviews
      await this.performReviews();
      
      // Step 5: Generate Summary
      await this.generateSummary();
      
      console.log('✅ Code review completed successfully!');
      console.log(`📁 Review documents saved to: ${this.options.outputBasePath}`);
      
    } catch (error) {
      console.error('❌ Code review failed:', error.message);
      process.exit(1);
    }
  }

  async analyzeProject() {
    console.log('🔍 Analyzing project structure...');
    
    // Detect project type
    this.projectType = await this.detectProjectType();
    console.log(`📋 Detected project type: ${this.projectType}`);
    
    // Create output directories
    await this.createOutputDirectories();
  }

  async detectProjectType() {
    const rootFiles = await fs.readdir('.');
    
    for (const [type, pattern] of Object.entries(PROJECT_PATTERNS)) {
      const hasIndicators = pattern.indicators.some(indicator => 
        rootFiles.includes(indicator)
      );
      
      if (hasIndicators) {
        // Additional validation for specific types
        if (type === 'nextjs') {
          try {
            const packageJson = JSON.parse(await fs.readFile('package.json', 'utf8'));
            if (packageJson.dependencies?.next || packageJson.devDependencies?.next) {
              return type;
            }
          } catch (e) {
            // Continue checking other types
          }
        } else {
          return type;
        }
      }
    }
    
    return 'generic';
  }

  async createOutputDirectories() {
    const dirs = [
      this.options.outputBasePath,
      `${this.options.outputBasePath}/reviews`,
      `${this.options.outputBasePath}/tasks`,
      `${this.options.outputBasePath}/summary`,
      `${this.options.outputBasePath}/index`
    ];
    
    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  }

  async loadReviewGuidelines() {
    console.log('📖 Loading review guidelines...');
    
    try {
      // Try multiple possible paths for the review guidelines
      const possiblePaths = [
        this.options.reviewGuidelinesPath,
        path.join(process.cwd(), this.options.reviewGuidelinesPath),
        path.join(process.cwd(), '..', '..', this.options.reviewGuidelinesPath),
        path.join(process.cwd(), '..', this.options.reviewGuidelinesPath)
      ];
      
      let guidelinesPath = null;
      for (const testPath of possiblePaths) {
        try {
          await fs.access(testPath);
          guidelinesPath = testPath;
          break;
        } catch (e) {
          // Continue to next path
        }
      }
      
      if (!guidelinesPath) {
        throw new Error(`Review guidelines not found in any of these locations: ${possiblePaths.join(', ')}`);
      }
      
      const content = await fs.readFile(guidelinesPath, 'utf8');
      this.reviewGuidelines = content;
      console.log(`📄 Loaded guidelines from: ${guidelinesPath}`);
    } catch (error) {
      throw new Error(`Failed to load review guidelines: ${error.message}`);
    }
  }

  async discoverSourceFiles() {
    console.log('🔎 Discovering source files...');
    
    const pattern = PROJECT_PATTERNS[this.projectType] || PROJECT_PATTERNS.generic;
    const extensions = pattern.extensions;
    
    this.sourceFiles = await this.findSourceFiles('.', extensions);
    
    // Apply filters
    this.sourceFiles = this.sourceFiles.filter(file => {
      // File size filter
      if (this.options.maxFileSize) {
        const stats = fs.statSync(file);
        if (stats.size > this.options.maxFileSize * 1024) {
          return false;
        }
      }
      
      // Directory filter
      if (this.options.dir && !file.startsWith(this.options.dir)) {
        return false;
      }
      
      // File type filter
      if (this.options.filter) {
        const ext = path.extname(file);
        if (!this.options.filter.includes(ext)) {
          return false;
        }
      }
      
      return true;
    });
    
    console.log(`📁 Found ${this.sourceFiles.length} source files to review`);
  }

  async findSourceFiles(dir, extensions, baseDir = '.') {
    const files = [];
    
    try {
      const entries = await fs.readdir(path.join(baseDir, dir), { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Skip common directories that shouldn't be reviewed
          if (['node_modules', '.git', '.next', 'dist', 'build', 'coverage'].includes(entry.name)) {
            continue;
          }
          
          const subFiles = await this.findSourceFiles(fullPath, extensions, baseDir);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      // Skip directories we can't access
      console.warn(`⚠️  Cannot access directory: ${path.join(baseDir, dir)}`);
    }
    
    return files;
  }

  async performReviews() {
    console.log('🔍 Performing code reviews...');
    
    const reviews = [];
    const tasks = [];
    
    // Process files in batches to avoid overwhelming the system
    const batchSize = this.options.parallelLimit;
    for (let i = 0; i < this.sourceFiles.length; i += batchSize) {
      const batch = this.sourceFiles.slice(i, i + batchSize);
      
      const batchPromises = batch.map(file => this.reviewFile(file));
      const batchResults = await Promise.all(batchPromises);
      
      for (const result of batchResults) {
        if (result.review) {
          reviews.push(result.review);
        }
        if (result.tasks) {
          tasks.push(result.tasks);
        }
      }
      
      console.log(`📊 Processed ${Math.min(i + batchSize, this.sourceFiles.length)}/${this.sourceFiles.length} files`);
    }
    
    // Save review documents
    await this.saveReviewDocuments(reviews);
    await this.saveTaskDocuments(tasks);
  }

  async reviewFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const fileName = path.basename(filePath);
      const fileExt = path.extname(filePath);
      
      // Apply review criteria based on file type and project type
      const findings = await this.applyReviewCriteria(content, filePath, fileExt);
      
      if (findings.length === 0) {
        return { review: null, tasks: null };
      }
      
      // Generate review document
      const review = this.generateReviewDocument(filePath, findings);
      
      // Generate task document
      const tasks = this.generateTaskDocument(filePath, findings);
      
      return { review, tasks };
      
    } catch (error) {
      console.warn(`⚠️  Failed to review ${filePath}: ${error.message}`);
      return { review: null, tasks: null };
    }
  }

  async applyReviewCriteria(content, filePath, fileExt) {
    const findings = [];
    
    // Apply criteria based on project type and file type
    const applicableCriteria = this.getApplicableCriteria(fileExt);
    
    for (const [criterionId, criterionName] of Object.entries(applicableCriteria)) {
      const issues = await this.checkCriterion(criterionId, criterionName, content, filePath, fileExt);
      if (issues.length > 0) {
        findings.push({
          criterion: criterionId,
          name: criterionName,
          issues: issues
        });
      }
    }
    
    return findings;
  }

  getApplicableCriteria(fileExt) {
    const criteria = { ...REVIEW_CRITERIA };
    
    // Platform-specific focus
    if (this.projectType === 'nextjs') {
      // Emphasize NextJS-specific criteria
      if (['.tsx', '.ts', '.jsx', '.js'].includes(fileExt)) {
        // Component files - focus on React/TypeScript/NextJS
        return {
          5: criteria[5],   // Component Structure
          11: criteria[11], // Accessibility
          12: criteria[12]  // React/TypeScript/NextJS
        };
      } else if (['.css', '.scss'].includes(fileExt)) {
        // Style files - focus on accessibility and performance
        return {
          8: criteria[8],   // Performance
          11: criteria[11]  // Accessibility
        };
      }
    }
    
    // Generic criteria for other file types
    return {
      1: criteria[1],   // Bugs & Edge Cases
      2: criteria[2],   // Hard-coded Elements
      3: criteria[3],   // Artificial Constraints
      4: criteria[4],   // Code Duplication
      6: criteria[6],   // Best Practices
      7: criteria[7],   // Documentation
      9: criteria[9],   // Security
      10: criteria[10]  // Testing
    };
  }

  async checkCriterion(criterionId, criterionName, content, filePath, fileExt) {
    const issues = [];
    
    switch (criterionId) {
      case '1': // Potential Bugs & Edge Cases
        issues.push(...this.checkForBugs(content, filePath));
        break;
      case '2': // Hard-coded Elements
        issues.push(...this.checkForHardcodedElements(content, filePath));
        break;
      case '3': // Artificial Constraints
        issues.push(...this.checkForArtificialConstraints(content, filePath));
        break;
      case '4': // Code Duplication
        issues.push(...this.checkForCodeDuplication(content, filePath));
        break;
      case '5': // Component Structure
        if (['.tsx', '.jsx'].includes(fileExt)) {
          issues.push(...this.checkComponentStructure(content, filePath));
        }
        break;
      case '6': // Design Patterns & Best Practices
        issues.push(...this.checkBestPractices(content, filePath, fileExt));
        break;
      case '7': // Type Safety & Documentation
        issues.push(...this.checkTypeSafetyAndDocumentation(content, filePath, fileExt));
        break;
      case '8': // Performance Considerations
        issues.push(...this.checkPerformance(content, filePath));
        break;
      case '9': // Security Considerations
        issues.push(...this.checkSecurity(content, filePath));
        break;
      case '10': // Testing Coverage
        const testIssues = await this.checkTestingCoverage(content, filePath);
        issues.push(...testIssues);
        break;
      case '11': // Accessibility & User Experience
        if (['.tsx', '.jsx', '.css', '.scss'].includes(fileExt)) {
          issues.push(...this.checkAccessibility(content, filePath));
        }
        break;
      case '12': // React, TypeScript, and NextJS specific
        if (this.projectType === 'nextjs' && ['.tsx', '.ts', '.jsx', '.js'].includes(fileExt)) {
          issues.push(...this.checkNextJSSpecific(content, filePath, fileExt));
        }
        break;
    }
    
    return issues;
  }

  // Individual criterion check methods
  checkForBugs(content, filePath) {
    const issues = [];
    
    // Check for common bug patterns
    const patterns = [
      { pattern: /console\.log\(/, message: 'Console.log statements should be removed in production' },
      { pattern: /debugger;/, message: 'Debugger statements should be removed' },
      { pattern: /TODO|FIXME|HACK/, message: 'TODO/FIXME/HACK comments indicate incomplete work' },
      { pattern: /catch\s*\(\s*\)/, message: 'Empty catch blocks may hide errors' }
    ];
    
    const lines = content.split('\n');
    patterns.forEach(({ pattern, message }) => {
      lines.forEach((line, index) => {
        if (pattern.test(line)) {
          issues.push({
            line: index + 1,
            message: message,
            code: line.trim(),
            priority: 'P2'
          });
        }
      });
    });
    
    return issues;
  }

  checkForHardcodedElements(content, filePath) {
    const issues = [];
    
    // Check for hard-coded values
    const patterns = [
      { pattern: /['"]\d{4}['"]/, message: 'Hard-coded year should be configurable' },
      { pattern: /['"]https?:\/\/[^'"]+['"]/, message: 'Hard-coded URLs should be configurable' },
      { pattern: /['"]\d{2,}['"]/, message: 'Large hard-coded numbers should be constants' }
    ];
    
    const lines = content.split('\n');
    patterns.forEach(({ pattern, message }) => {
      lines.forEach((line, index) => {
        if (pattern.test(line)) {
          issues.push({
            line: index + 1,
            message: message,
            code: line.trim(),
            priority: 'P1'
          });
        }
      });
    });
    
    return issues;
  }

  checkForArtificialConstraints(content, filePath) {
    const issues = [];
    
    // Check for artificial limits
    const patterns = [
      { pattern: /\.slice\(0,\s*\d+\)/, message: 'Fixed array slice may limit functionality' },
      { pattern: /\.length\s*[><=]\s*\d+/, message: 'Fixed length checks may be too restrictive' }
    ];
    
    const lines = content.split('\n');
    patterns.forEach(({ pattern, message }) => {
      lines.forEach((line, index) => {
        if (pattern.test(line)) {
          issues.push({
            line: index + 1,
            message: message,
            code: line.trim(),
            priority: 'P2'
          });
        }
      });
    });
    
    return issues;
  }

  checkForCodeDuplication(content, filePath) {
    const issues = [];
    
    // Simple duplication check - look for repeated code blocks
    const lines = content.split('\n');
    const codeBlocks = new Map();
    
    for (let i = 0; i < lines.length - 2; i++) {
      const block = lines.slice(i, i + 3).join('\n');
      if (codeBlocks.has(block)) {
        issues.push({
          line: i + 1,
          message: 'Potential code duplication detected',
          code: block.split('\n')[0],
          priority: 'P2'
        });
      } else {
        codeBlocks.set(block, i);
      }
    }
    
    return issues;
  }

  checkComponentStructure(content, filePath) {
    const issues = [];
    
    // Check for large components
    const lines = content.split('\n');
    if (lines.length > 200) {
      issues.push({
        line: 1,
        message: 'Component is very large and should be split into smaller components',
        code: `Component has ${lines.length} lines`,
        priority: 'P1'
      });
    }
    
    // Check for multiple responsibilities
    const hasState = /useState|useReducer/.test(content);
    const hasEffects = /useEffect/.test(content);
    const hasEventHandlers = /onClick|onChange|onSubmit/.test(content);
    const hasRendering = /return\s*\(/.test(content);
    
    if (hasState && hasEffects && hasEventHandlers && hasRendering) {
      issues.push({
        line: 1,
        message: 'Component has multiple responsibilities and should be refactored',
        code: 'Component handles state, effects, events, and rendering',
        priority: 'P1'
      });
    }
    
    return issues;
  }

  checkBestPractices(content, filePath, fileExt) {
    const issues = [];
    
    if (fileExt === '.tsx' || fileExt === '.ts') {
      // TypeScript best practices
      if (/any\s*[:=]/.test(content)) {
        issues.push({
          line: 1,
          message: 'Avoid using "any" type - use more specific types',
          code: 'any type usage detected',
          priority: 'P1'
        });
      }
    }
    
    if (this.projectType === 'nextjs') {
      // NextJS best practices
      if (/className\s*=\s*\{.*\+.*\}/.test(content)) {
        issues.push({
          line: 1,
          message: 'Use "cn" utility instead of string concatenation for className',
          code: 'String concatenation in className',
          priority: 'P2'
        });
      }
    }
    
    return issues;
  }

  checkTypeSafetyAndDocumentation(content, filePath, fileExt) {
    const issues = [];
    
    // Check for missing documentation
    const hasExports = /export/.test(content);
    const hasComments = /\/\*|\/\/.*\n/.test(content);
    
    if (hasExports && !hasComments) {
      issues.push({
        line: 1,
        message: 'Exported functions/components should have documentation',
        code: 'Missing documentation for exports',
        priority: 'P3'
      });
    }
    
    return issues;
  }

  checkPerformance(content, filePath) {
    const issues = [];
    
    // Check for performance issues
    if (/\.map\(.*=>.*\.map\(/.test(content)) {
      issues.push({
        line: 1,
        message: 'Nested map operations can be optimized',
        code: 'Nested map operations detected',
        priority: 'P2'
      });
    }
    
    return issues;
  }

  checkSecurity(content, filePath) {
    const issues = [];
    
    // Check for security issues
    if (/innerHTML\s*=/.test(content)) {
      issues.push({
        line: 1,
        message: 'innerHTML can lead to XSS vulnerabilities',
        code: 'innerHTML usage detected',
        priority: 'P0'
      });
    }
    
    return issues;
  }

  async checkTestingCoverage(content, filePath) {
    const issues = [];
    
    // Check if file has corresponding test file
    const testFile = filePath.replace(/\.[^/.]+$/, '.test.' + filePath.split('.').pop());
    const specFile = filePath.replace(/\.[^/.]+$/, '.spec.' + filePath.split('.').pop());
    
    try {
      await fs.access(testFile);
      await fs.access(specFile);
    } catch {
      issues.push({
        line: 1,
        message: 'File should have corresponding test file',
        code: 'Missing test file',
        priority: 'P2'
      });
    }
    
    return issues;
  }

  checkAccessibility(content, filePath) {
    const issues = [];
    
    // Check for accessibility issues
    if (/<button[^>]*>/.test(content) && !/aria-label|aria-labelledby/.test(content)) {
      issues.push({
        line: 1,
        message: 'Buttons should have accessible labels',
        code: 'Button without aria-label',
        priority: 'P1'
      });
    }
    
    return issues;
  }

  checkNextJSSpecific(content, filePath, fileExt) {
    const issues = [];
    
    // NextJS specific checks
    if (fileExt === '.tsx' || fileExt === '.jsx') {
      if (/use client/.test(content) && /getServerSideProps|getStaticProps/.test(content)) {
        issues.push({
          line: 1,
          message: 'Client components should not use server-side data fetching',
          code: 'Client component with server-side data fetching',
          priority: 'P1'
        });
      }
    }
    
    return issues;
  }

  generateReviewDocument(filePath, findings) {
    const fileName = path.basename(filePath);
    const reviewDate = this.getCurrentDate();
    
    const yamlHeader = `---
layer: project
docType: review
projectType: ${this.projectType}
reviewDate: ${new Date().toISOString().split('T')[0]}
reviewer: automated-agent
priority: ${this.getHighestPriority(findings)}
---`;

    let content = `# Code Review: ${fileName}\n\n`;
    content += yamlHeader + '\n\n';
    
    // Group findings by category
    const categories = {
      'Critical Issues': [],
      'Code Quality Improvements': [],
      'Best Practices & Patterns': [],
      'Accessibility & UX': [],
      'Testing & Documentation': []
    };
    
    findings.forEach(finding => {
      const category = this.categorizeFinding(finding);
      categories[category].push(finding);
    });
    
    // Generate content for each category
    Object.entries(categories).forEach(([category, categoryFindings]) => {
      if (categoryFindings.length > 0) {
        content += `## ${category}\n\n`;
        
        categoryFindings.forEach(finding => {
          content += `- [ ] **${finding.name}**: ${finding.issues.length} issues found\n`;
          finding.issues.forEach(issue => {
            content += `  - Line ${issue.line}: ${issue.message}\n`;
          });
          content += '\n';
        });
      }
    });
    
    content += `## Summary\n\n`;
    content += `Found ${findings.length} categories of issues with ${findings.reduce((sum, f) => sum + f.issues.length, 0)} total issues.\n`;
    content += `Priority level: ${this.getHighestPriority(findings)}\n`;
    
    return {
      fileName: `review.${fileName}.${reviewDate}.md`,
      content: content
    };
  }

  generateTaskDocument(filePath, findings) {
    const fileName = path.basename(filePath);
    const reviewDate = this.getCurrentDate();
    
    const yamlHeader = `---
layer: project
docType: task-expansion
audience: [ai, human]
description: Code review tasks for ${fileName}
dependsOn: [review.${fileName}.${reviewDate}.md]
---`;

    let content = `# Code Review Tasks: ${fileName}\n\n`;
    content += yamlHeader + '\n\n';
    
    // Group by priority
    const priorities = ['P0', 'P1', 'P2', 'P3'];
    
    priorities.forEach(priority => {
      const priorityFindings = findings.filter(f => 
        f.issues.some(issue => issue.priority === priority)
      );
      
      if (priorityFindings.length > 0) {
        content += `## ${priority}: ${this.getPriorityDescription(priority)}\n\n`;
        
        priorityFindings.forEach(finding => {
          const priorityIssues = finding.issues.filter(issue => issue.priority === priority);
          
          priorityIssues.forEach((issue, index) => {
            content += `- [ ] **Task: ${finding.name} - ${issue.message}**\n`;
            content += `  - File: ${filePath}\n`;
            content += `  - Line: ${issue.line}\n`;
            content += `  - Issue: ${issue.message}\n`;
            content += `  - **Success:** Issue resolved and verified\n\n`;
          });
        });
      }
    });
    
    return {
      fileName: `tasks.code-review.${fileName}.${reviewDate}.md`,
      content: content
    };
  }

  categorizeFinding(finding) {
    const criticalCriteria = ['1', '9']; // Bugs, Security
    const qualityCriteria = ['2', '3', '4', '5']; // Hard-coded, Constraints, Duplication, Structure
    const practiceCriteria = ['6', '7', '12']; // Best Practices, Documentation, Platform-specific
    const accessibilityCriteria = ['11']; // Accessibility
    const testingCriteria = ['10']; // Testing
    
    if (criticalCriteria.includes(finding.criterion)) {
      return 'Critical Issues';
    } else if (qualityCriteria.includes(finding.criterion)) {
      return 'Code Quality Improvements';
    } else if (practiceCriteria.includes(finding.criterion)) {
      return 'Best Practices & Patterns';
    } else if (accessibilityCriteria.includes(finding.criterion)) {
      return 'Accessibility & UX';
    } else if (testingCriteria.includes(finding.criterion)) {
      return 'Testing & Documentation';
    } else {
      return 'Best Practices & Patterns';
    }
  }

  getHighestPriority(findings) {
    const priorities = findings.flatMap(f => f.issues.map(i => i.priority));
    if (priorities.includes('P0')) return 'P0';
    if (priorities.includes('P1')) return 'P1';
    if (priorities.includes('P2')) return 'P2';
    if (priorities.includes('P3')) return 'P3';
    return 'P3';
  }

  getPriorityDescription(priority) {
    const descriptions = {
      'P0': 'Critical Issues',
      'P1': 'Code Quality',
      'P2': 'Best Practices',
      'P3': 'Enhancements'
    };
    return descriptions[priority] || 'Unknown';
  }

  async saveReviewDocuments(reviews) {
    console.log('💾 Saving review documents...');
    
    for (const review of reviews) {
      if (review) {
        const filePath = path.join(this.options.outputBasePath, 'reviews', review.fileName);
        await fs.writeFile(filePath, review.content);
      }
    }
  }

  async saveTaskDocuments(tasks) {
    console.log('📋 Saving task documents...');
    
    for (const task of tasks) {
      if (task) {
        const filePath = path.join(this.options.outputBasePath, 'tasks', task.fileName);
        await fs.writeFile(filePath, task.content);
      }
    }
  }

  async generateSummary() {
    console.log('📊 Generating summary report...');
    
    const reviewFiles = await fs.readdir(path.join(this.options.outputBasePath, 'reviews'));
    const taskFiles = await fs.readdir(path.join(this.options.outputBasePath, 'tasks'));
    
    const summary = {
      fileName: `review-summary.${this.reviewDate}.md`,
      content: this.generateSummaryContent(reviewFiles, taskFiles)
    };
    
    const summaryPath = path.join(this.options.outputBasePath, 'summary', summary.fileName);
    await fs.writeFile(summaryPath, summary.content);
    
    // Generate index
    const index = {
      fileName: `review-index.${this.reviewDate}.md`,
      content: this.generateIndexContent(reviewFiles, taskFiles)
    };
    
    const indexPath = path.join(this.options.outputBasePath, 'index', index.fileName);
    await fs.writeFile(indexPath, index.content);
  }

  generateSummaryContent(reviewFiles, taskFiles) {
    const yamlHeader = `---
layer: project
docType: summary
projectType: ${this.projectType}
reviewDate: ${new Date().toISOString().split('T')[0]}
reviewer: automated-agent
---`;

    let content = `# Code Review Summary\n\n`;
    content += yamlHeader + '\n\n';
    
    content += `## Review Statistics\n\n`;
    content += `- **Project Type**: ${this.projectType}\n`;
    content += `- **Files Reviewed**: ${this.sourceFiles.length}\n`;
    content += `- **Review Documents Generated**: ${reviewFiles.length}\n`;
    content += `- **Task Documents Generated**: ${taskFiles.length}\n`;
    content += `- **Review Date**: ${new Date().toISOString().split('T')[0]}\n\n`;
    
    content += `## Quick Actions\n\n`;
    content += `1. Review generated documents in \`${this.options.outputBasePath}/reviews/\`\n`;
    content += `2. Prioritize tasks from \`${this.options.outputBasePath}/tasks/\`\n`;
    content += `3. Focus on P0 and P1 issues first\n`;
    content += `4. Update review guidelines based on findings\n\n`;
    
    return content;
  }

  generateIndexContent(reviewFiles, taskFiles) {
    const yamlHeader = `---
layer: project
docType: index
projectType: ${this.projectType}
reviewDate: ${new Date().toISOString().split('T')[0]}
reviewer: automated-agent
---`;

    let content = `# Code Review Index\n\n`;
    content += yamlHeader + '\n\n';
    
    content += `## Review Documents\n\n`;
    reviewFiles.forEach(file => {
      content += `- [${file}](./reviews/${file})\n`;
    });
    
    content += `\n## Task Documents\n\n`;
    taskFiles.forEach(file => {
      content += `- [${file}](./tasks/${file})\n`;
    });
    
    return content;
  }

  getCurrentDate() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${month}${day}`;
  }
}

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value;
    }
  });
  
  return options;
}

// Main execution
async function main() {
  const options = parseArgs();
  const agent = new CodeReviewAgent(options);
  await agent.run();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = CodeReviewAgent; 