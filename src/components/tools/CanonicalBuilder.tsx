import { useState } from 'react';

export default function CanonicalBuilder() {
  const [url, setUrl] = useState('');
  const [variants, setVariants] = useState('');

  const canonical = url ? `<link rel="canonical" href="${url}" />` : '';
  const variantList = variants.split('\n').filter(v => v.trim());

  return (
    <div className="space-y-4">
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL (preferred version)</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page" className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" /></div>
      <div><label className="block text-sm font-medium text-gray-700 mb-1">Variant URLs (duplicates pointing to canonical)</label>
        <textarea value={variants} onChange={e => setVariants(e.target.value)} placeholder="https://example.com/page?ref=email&#10;https://www.example.com/page&#10;https://example.com/page/" className="w-full h-28 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" /></div>
      {canonical && (
        <>
          <div className="relative">
            <p className="text-sm font-medium text-gray-700 mb-1">Add to &lt;head&gt; of all variant pages:</p>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono">{canonical}</pre>
            <button onClick={() => navigator.clipboard.writeText(canonical)} className="absolute top-8 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
          </div>
          {variantList.length > 0 && (
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">These URLs should all point to:</p>
              <p className="text-teal-600 font-mono text-sm mb-3">{url}</p>
              {variantList.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-sm py-1">
                  <span className="text-gray-400 font-mono">{v}</span><span className="text-orange-500">→</span><span className="text-teal-600">canonical</span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
