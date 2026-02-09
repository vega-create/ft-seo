import { useState } from 'react';

export default function MetaTagGen() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [keywords, setKeywords] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [ogImage, setOgImage] = useState('');

  const output = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    title && `<title>${title}</title>`,
    desc && `<meta name="description" content="${desc}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    author && `<meta name="author" content="${author}">`,
    '',
    title && `<meta property="og:title" content="${title}">`,
    desc && `<meta property="og:description" content="${desc}">`,
    url && `<meta property="og:url" content="${url}">`,
    ogImage && `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:type" content="website">`,
    '',
    title && `<meta name="twitter:title" content="${title}">`,
    desc && `<meta name="twitter:description" content="${desc}">`,
    ogImage && `<meta name="twitter:image" content="${ogImage}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    '',
    url && `<link rel="canonical" href="${url}">`,
  ].filter(Boolean).join('\n');

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Title *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="My Awesome Page" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-500" />
          <span className={`text-xs ${title.length>60?'text-red-500':'text-gray-400'}`}>{title.length}/60</span></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
          <input type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="A brief description of your page..." className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg outline-none" />
        <span className={`text-xs ${desc.length>160?'text-red-500':'text-gray-400'}`}>{desc.length}/160</span></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
        <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="seo, tools, free" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label><input type="url" value={ogImage} onChange={e => setOgImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono whitespace-pre-wrap">{output}</pre>
        <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
      </div>
    </div>
  );
}
