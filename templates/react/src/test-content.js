// Simple test script to verify content loading works
import { getViteContentProvider } from './lib/adapters/ViteContentProvider.js';

const provider = getViteContentProvider();

console.log('Testing content loading...');

try {
  const quote = await provider.loadContent('quotes/developer-testimonial');
  console.log('✅ Content loaded successfully:', quote.frontmatter.quote);
  console.log('✅ Content author:', quote.frontmatter.author);
} catch (error) {
  console.error('❌ Content loading failed:', error.message);
}