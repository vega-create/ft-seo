import { useState } from 'react';

export default function RobotsTxt() {
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [rules, setRules] = useState([{agent:'*',disallow:['/admin/','/private/'],allow:['/']}]);
  const [crawlDelay, setCrawlDelay] = useState('');

  const addRule = () => setRules([...rules, {agent:'*',disallow:['/'],allow:[]}]);
  const output = rules.map(r => {
    let s = `User-agent: ${r.agent}\n`;
    r.allow.forEach(a => s += `Allow: ${a}\n`);
    r.disallow.forEach(d => s += `Disallow: ${d}\n`);
    if (crawlDelay) s += `Crawl-delay: ${crawlDelay}\n`;
    return s;
  }).join('\n') + (sitemapUrl ? `\nSitemap: ${sitemapUrl}\n` : '');

  return (
    <div className="space-y-4">
      {rules.map((rule, i) => (
        <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600 w-24">User-agent:</label>
            <input type="text" value={rule.agent} onChange={e => {const n=[...rules];n[i].agent=e.target.value;setRules(n);}} className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-mono" />
          </div>
          <div><label className="text-sm text-gray-600">Disallow (one per line):</label>
            <textarea value={rule.disallow.join('\n')} onChange={e => {const n=[...rules];n[i].disallow=e.target.value.split('\n');setRules(n);}} className="w-full h-20 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono mt-1" /></div>
          <div><label className="text-sm text-gray-600">Allow (one per line):</label>
            <textarea value={rule.allow.join('\n')} onChange={e => {const n=[...rules];n[i].allow=e.target.value.split('\n');setRules(n);}} className="w-full h-16 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono mt-1" /></div>
        </div>
      ))}
      <div className="flex gap-3 flex-wrap">
        <button onClick={addRule} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm">+ Add Rule</button>
        <div><label className="text-xs text-gray-500 mr-2">Sitemap URL:</label><input type="url" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} placeholder="https://example.com/sitemap.xml" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-72" /></div>
        <div><label className="text-xs text-gray-500 mr-2">Crawl-delay:</label><input type="number" value={crawlDelay} onChange={e => setCrawlDelay(e.target.value)} placeholder="10" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-20" /></div>
      </div>
      <div className="relative">
        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-sm font-mono whitespace-pre-wrap">{output}</pre>
        <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white rounded text-xs">Copy</button>
      </div>
    </div>
  );
}
