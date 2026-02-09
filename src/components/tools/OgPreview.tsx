import { useState } from 'react';

export default function OgPreview() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [siteName, setSiteName] = useState('');

  const tags = [
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:type" content="website" />`,
    url && `<meta property="og:url" content="${url}" />`,
    image && `<meta property="og:image" content="${image}" />`,
    siteName && `<meta property="og:site_name" content="${siteName}" />`,
  ].filter(Boolean).join('\n');

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page Title" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Site Name</label><input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="My Website" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <div><label className="text-xs text-gray-500">Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Page description..." className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">URL</label><input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">Image URL</label><input type="url" value={image} onChange={e => setImage(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-lg">
        <p className="text-xs text-gray-400 px-4 pt-3 mb-2">Facebook / LinkedIn Preview</p>
        {image && <img src={image} alt="" className="w-full h-52 object-cover bg-gray-100" onError={e => (e.target as HTMLImageElement).style.display='none'} />}
        <div className="p-4 bg-gray-50 border-t">
          <p className="text-xs text-gray-500 uppercase">{siteName || new URL(url || 'https://example.com').hostname}</p>
          <p className="font-semibold text-gray-900 mt-1">{title || 'Page Title'}</p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{desc || 'Page description...'}</p>
        </div>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono whitespace-pre-wrap">{tags}</pre>
        <button onClick={() => navigator.clipboard.writeText(tags)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
      </div>
    </div>
  );
}
