import { useState } from 'react';

export default function RedirectChecker() {
  const [url, setUrl] = useState('');
  const [note] = useState('This tool checks redirect chains by following HTTP redirects. Due to browser security restrictions (CORS), this tool works best with URLs that allow cross-origin requests. For full redirect chain analysis, use command-line tools like curl -LI.');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/old-page" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-500" />
        <button onClick={() => { if (url) window.open(`https://httpstatus.io/${encodeURIComponent(url)}`, '_blank'); }} className="px-6 py-2 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-700 flex-shrink-0">Check</button>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
        <p className="text-sm text-teal-800 font-medium mb-2">💡 Quick Check with curl</p>
        <code className="bg-gray-900 text-green-400 text-sm font-mono p-3 rounded-lg block overflow-x-auto">{url ? `curl -LIs "${url}" | grep -E "^HTTP|^location"` : 'curl -LIs "https://example.com" | grep -E "^HTTP|^location"'}</code>
      </div>
      <p className="text-sm text-gray-500">{note}</p>
    </div>
  );
}
