import { useState } from 'react';

export default function TitleChecker() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('https://example.com/page');

  const titleOk = title.length >= 30 && title.length <= 60;
  const descOk = desc.length >= 120 && desc.length <= 160;

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter your page title..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-lg outline-none focus:ring-2 focus:ring-teal-500" />
        <div className="flex justify-between mt-1"><span className={`text-xs ${titleOk?'text-green-600':'text-orange-500'}`}>{titleOk?'✓ Good length':'Recommended: 30-60 characters'}</span><span className={`text-xs ${title.length>60?'text-red-500':'text-gray-400'}`}>{title.length}/60</span></div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter your meta description..." className="w-full h-24 px-4 py-3 border border-gray-200 rounded-xl outline-none" />
        <div className="flex justify-between mt-1"><span className={`text-xs ${descOk?'text-green-600':'text-orange-500'}`}>{descOk?'✓ Good length':'Recommended: 120-160 characters'}</span><span className={`text-xs ${desc.length>160?'text-red-500':'text-gray-400'}`}>{desc.length}/160</span></div></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">URL (for preview)</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" /></div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-500 mb-2">Google Search Preview</p>
        <div className="space-y-1">
          <p className="text-blue-700 text-xl hover:underline cursor-pointer truncate">{title || 'Page Title'}</p>
          <p className="text-green-700 text-sm truncate">{url}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{desc || 'Meta description will appear here...'}</p>
        </div>
      </div>
    </div>
  );
}
