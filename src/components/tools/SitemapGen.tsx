import { useState } from 'react';

export default function SitemapGen() {
  const [urls, setUrls] = useState('');
  const [freq, setFreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [output, setOutput] = useState('');

  const generate = () => {
    const list = urls.split('\n').map(u => u.trim()).filter(Boolean);
    if (list.length === 0) return;
    const today = new Date().toISOString().split('T')[0];
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    list.forEach(url => {
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${freq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;
      xml += '  </url>\n';
    });
    xml += '</urlset>';
    setOutput(xml);
  };

  const download = () => {
    const blob = new Blob([output], {type:'application/xml'});
    const a = document.createElement('a'); a.download = 'sitemap.xml'; a.href = URL.createObjectURL(blob); a.click();
  };

  return (
    <div className="space-y-4">
      <textarea value={urls} onChange={e => setUrls(e.target.value)} placeholder="https://example.com/\nhttps://example.com/about\nhttps://example.com/blog" className="w-full h-40 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <div className="flex gap-3 items-end flex-wrap">
        <div><label className="text-xs text-gray-500">Frequency</label>
          <select value={freq} onChange={e => setFreq(e.target.value)} className="block px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {['always','hourly','daily','weekly','monthly','yearly','never'].map(f => <option key={f} value={f}>{f}</option>)}
          </select></div>
        <div><label className="text-xs text-gray-500">Priority</label>
          <select value={priority} onChange={e => setPriority(e.target.value)} className="block px-3 py-2 border border-gray-200 rounded-lg text-sm">
            {['1.0','0.9','0.8','0.7','0.6','0.5','0.4','0.3','0.2','0.1'].map(p => <option key={p} value={p}>{p}</option>)}
          </select></div>
        <button onClick={generate} className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono max-h-80">{output}</pre>
          <div className="flex gap-2 mt-2">
            <button onClick={() => navigator.clipboard.writeText(output)} className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm">Copy</button>
            <button onClick={download} className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm">Download XML</button>
          </div>
        </div>
      )}
    </div>
  );
}
