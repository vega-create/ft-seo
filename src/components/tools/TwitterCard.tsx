import { useState } from 'react';

export default function TwitterCard() {
  const [card, setCard] = useState<'summary'|'summary_large_image'>('summary_large_image');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [site, setSite] = useState('');

  const tags = [
    `<meta name="twitter:card" content="${card}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    image && `<meta name="twitter:image" content="${image}" />`,
    site && `<meta name="twitter:site" content="${site}" />`,
  ].filter(Boolean).join('\n');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['summary','summary_large_image'] as const).map(c => (
          <button key={c} onClick={() => setCard(c)} className={`px-3 py-2 rounded-lg text-sm ${card===c?'bg-teal-600 text-white':'bg-gray-100 text-gray-600'}`}>{c === 'summary' ? 'Summary' : 'Large Image'}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs text-gray-500">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
        <div><label className="text-xs text-gray-500">@site</label><input type="text" value={site} onChange={e => setSite(e.target.value)} placeholder="@yoursite" className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      </div>
      <div><label className="text-xs text-gray-500">Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Post description..." className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      <div><label className="text-xs text-gray-500">Image URL</label><input type="url" value={image} onChange={e => setImage(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none" /></div>
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden max-w-lg">
        <p className="text-xs text-gray-400 px-4 pt-3 mb-2">X (Twitter) Preview</p>
        {card === 'summary_large_image' && image && <img src={image} alt="" className="w-full h-52 object-cover bg-gray-100" onError={e => (e.target as HTMLImageElement).style.display='none'} />}
        <div className={`p-3 ${card === 'summary' ? 'flex gap-3' : ''}`}>
          {card === 'summary' && image && <img src={image} alt="" className="w-32 h-32 object-cover rounded-lg bg-gray-100 flex-shrink-0" />}
          <div><p className="font-medium text-gray-900 text-sm">{title || 'Post title'}</p><p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{desc || 'Description...'}</p>{site && <p className="text-xs text-gray-400 mt-1">{site}</p>}</div>
        </div>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono whitespace-pre-wrap">{tags}</pre>
        <button onClick={() => navigator.clipboard.writeText(tags)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
      </div>
    </div>
  );
}
