import { useState } from 'react';

export default function KeywordDensity() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{word:string;count:number;density:string}[]>([]);
  const [stopWords] = useState(new Set('the a an and or but in on at to for of is it this that with from by as are was were be been has have had do does did will would could should may might shall can'.split(' ')));

  const analyze = () => {
    const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]).slice(0, 30)
      .map(([word, count]) => ({ word, count, density: (count / total * 100).toFixed(1) + '%' }));
    setResults(sorted);
  };

  const totalWords = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your content here..." className="w-full h-48 p-4 border border-gray-200 rounded-xl text-sm outline-none" />
      <div className="flex gap-3 items-center">
        <button onClick={analyze} className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700">Analyze</button>
        <span className="text-sm text-gray-500">{totalWords} words</span>
      </div>
      {results.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 text-left"><th className="px-4 py-2 text-gray-600">Keyword</th><th className="px-4 py-2 text-gray-600 text-right">Count</th><th className="px-4 py-2 text-gray-600 text-right">Density</th></tr></thead>
            <tbody>{results.map((r, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="px-4 py-2 font-medium">{r.word}</td>
                <td className="px-4 py-2 text-right text-gray-600">{r.count}</td>
                <td className="px-4 py-2 text-right"><span className={`px-2 py-0.5 rounded text-xs font-medium ${parseFloat(r.density)>3?'bg-orange-100 text-orange-700':'bg-teal-50 text-teal-700'}`}>{r.density}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
