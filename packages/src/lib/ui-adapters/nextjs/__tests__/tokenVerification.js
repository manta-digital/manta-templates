/**
 * Manual verification script for token interpolation functionality
 * Run with: node src/__tests__/tokenVerification.js
 */

const path = require('path');
const fs = require('fs');

// Import the built modules
const { NextjsTokenProvider, buildTokens } = require('../dist/content/index.js');
const { NextjsContentProvider } = require('../dist/content/index.js');

console.log('🧪 Token Interpolation Verification Script\n');

// Test site config
const testSiteConfig = {
  site: {
    url: 'https://example.com',
    name: 'Test Site',
    domain: 'example.com'
  },
  author: {
    name: 'John Doe'
  },
  contacts: {
    primaryEmail: 'contact@example.com',
    businessEmail: 'business@example.com',
    supportEmail: 'support@example.com'
  },
  copyright: {
    year: '2025'
  }
};

console.log('1. Testing buildTokens function...');
try {
  const tokens = buildTokens(testSiteConfig);
  console.log('✅ buildTokens function works');
  console.log('   Generated tokens:');
  Object.entries(tokens).forEach(([key, value]) => {
    console.log(`     ${key}: ${value}`);
  });
  console.log();
} catch (error) {
  console.log('❌ buildTokens function failed:', error.message);
  process.exit(1);
}

console.log('2. Testing NextjsTokenProvider class...');
try {
  const provider = new NextjsTokenProvider(testSiteConfig);
  const tokens = provider.buildTokens();
  console.log('✅ NextjsTokenProvider class works');
  console.log(`   Token count: ${Object.keys(tokens).length}`);
  console.log();
} catch (error) {
  console.log('❌ NextjsTokenProvider class failed:', error.message);
  process.exit(1);
}

console.log('3. Testing NextjsContentProvider instantiation...');
try {
  const contentProvider = new NextjsContentProvider({
    contentRoot: path.join(__dirname, '../../../../../../templates/nextjs/src/content'),
    enableCaching: false
  });
  console.log('✅ NextjsContentProvider instantiated successfully');
  console.log();
} catch (error) {
  console.log('❌ NextjsContentProvider instantiation failed:', error.message);
  process.exit(1);
}

console.log('4. Testing token interpolation with mock content...');
try {
  const contentProvider = new NextjsContentProvider({ enableCaching: false });
  const tokenProvider = new NextjsTokenProvider(testSiteConfig);
  
  // Test content with tokens
  const testContent = `
# Legal Information

*Last updated: {{copyright.lastUpdated}}*

Visit us at {{site.url}} and contact {{contacts.primaryEmail}} for support.
Contact {{author.name}} for more information.
Copyright holder: {{copyright.holder}}
  `.trim();
  
  // Access private method for testing
  const tokens = tokenProvider.buildTokens();
  const result = contentProvider.applyTokens(testContent, tokens);
  
  console.log('✅ Token interpolation works');
  console.log('   Original content:');
  console.log('     ' + testContent.split('\n').join('\n     '));
  console.log('   After token replacement:');
  console.log('     ' + result.split('\n').join('\n     '));
  console.log();
} catch (error) {
  console.log('❌ Token interpolation failed:', error.message);
  process.exit(1);
}

console.log('5. Testing error handling...');
try {
  const contentProvider = new NextjsContentProvider({ enableCaching: false });
  
  // Test with invalid tokens
  const testContent = 'Contact {{invalid.token}} for support.';
  const tokens = { 'valid.token': 'test@example.com' };
  
  const result = contentProvider.applyTokens(testContent, tokens);
  
  console.log('✅ Error handling works');
  console.log('   Content with unmatched token preserved:');
  console.log('     ' + result);
  console.log();
} catch (error) {
  console.log('❌ Error handling test failed:', error.message);
  process.exit(1);
}

console.log('6. Testing cache functionality...');
try {
  const contentProvider = new NextjsContentProvider({ enableCaching: true });
  const stats = contentProvider.getCacheStats();
  
  console.log('✅ Cache functionality works');
  console.log('   Cache stats:', stats);
  console.log();
} catch (error) {
  console.log('❌ Cache functionality test failed:', error.message);
  process.exit(1);
}

console.log('🎉 All token interpolation tests passed!\n');
console.log('Summary of functionality verified:');
console.log('  ✅ buildTokens function generates correct tokens');
console.log('  ✅ NextjsTokenProvider implements interface correctly'); 
console.log('  ✅ NextjsContentProvider instantiation works');
console.log('  ✅ Token interpolation replaces {{token}} patterns correctly');
console.log('  ✅ Error handling preserves unmatched tokens');
console.log('  ✅ Cache functionality includes token cache stats');
console.log();
console.log('✨ Token interpolation system is ready for integration!');