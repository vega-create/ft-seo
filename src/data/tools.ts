export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'meta', name: 'Meta & Tags', icon: '🏷️' },
  { id: 'content', name: 'Content Analysis', icon: '📝' },
  { id: 'technical', name: 'Technical SEO', icon: '⚙️' },
  { id: 'social', name: 'Social & Preview', icon: '📱' },
];

export const tools: Tool[] = [
  { name: 'Meta Tag Generator', slug: 'meta-tag-gen', description: 'Generate optimized meta tags for your web pages.', icon: '🏷️', category: 'meta' },
  { name: 'Title & Description Checker', slug: 'title-checker', description: 'Check length and preview of page titles and descriptions.', icon: '📏', category: 'meta' },
  { name: 'Heading Structure Checker', slug: 'heading-checker', description: 'Analyze heading hierarchy from HTML content.', icon: '📑', category: 'meta' },
  { name: 'Keyword Density Analyzer', slug: 'keyword-density', description: 'Analyze keyword frequency and density in your content.', icon: '🔑', category: 'content' },
  { name: 'Word Counter', slug: 'word-counter', description: 'Count words, characters, sentences, and reading time.', icon: '🔢', category: 'content' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text for design and development.', icon: '📄', category: 'content' },
  { name: 'Robots.txt Generator', slug: 'robots-txt', description: 'Create a robots.txt file for search engine crawlers.', icon: '🤖', category: 'technical' },
  { name: 'Sitemap Generator', slug: 'sitemap-gen', description: 'Generate XML sitemaps from a list of URLs.', icon: '🗺️', category: 'technical' },
  { name: 'Redirect Checker', slug: 'redirect-checker', description: 'Check URL redirect chains and status codes.', icon: '↪️', category: 'technical' },
  { name: 'Canonical URL Builder', slug: 'canonical-builder', description: 'Build canonical URL tags to prevent duplicate content.', icon: '🔗', category: 'technical' },
  { name: 'Open Graph Preview', slug: 'og-preview', description: 'Preview how your page appears when shared on social media.', icon: '👁️', category: 'social' },
  { name: 'Twitter Card Preview', slug: 'twitter-card', description: 'Preview and generate Twitter Card meta tags.', icon: '🐦', category: 'social' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
