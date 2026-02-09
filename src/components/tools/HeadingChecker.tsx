import { useState } from 'react';

interface Heading { tag: string; text: string; level: number; }

export default function HeadingChecker() {
  const [input, setInput] = useState('');
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [issues, setIssues] = useState<string[]>([]);

  const analyze = () => {
    const re = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
    const found: Heading[] = [];
    let m;
    while ((m = re.exec(input)) !== null) {
      found.push({ tag: `H${m[1]}`, text: m[2].replace(/<[^>]+>/g, ''), level: +m[1] });
    }
    setHeadings(found);
    const errs: string[] = [];
    if (found.length === 0) errs.push('No headings found');
    else {
      if (found[0]?.level !== 1) errs.push('Page should start with H1');
      const h1s = found.filter(h => h.level === 1);
      if (h1s.length > 1) errs.push(`Multiple H1 tags found (${h1s.length}). Use only one H1 per page.`);
      for (let i = 1; i < found.length; i++) {
        if (found[i].level > found[i-1].level + 1) errs.push(`Skipped heading level: ${found[i-1].tag} → ${found[i].tag}`);
      }
    }
    if (errs.length === 0 && found.length > 0) errs.push('✓ Heading structure looks good!');
    setIssues(errs);
  };

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste HTML content here..." className="w-full h-48 p-4 border border-gray-200 rounded-xl font-mono text-sm outline-none" />
      <button onClick={analyze} className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700">Analyze Headings</button>
      {headings.length > 0 && (
        <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-2">
          {headings.map((h, i) => (
            <div key={i} className="flex items-center gap-2" style={{paddingLeft: (h.level - 1) * 20}}>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${h.level===1?'bg-teal-100 text-teal-700':'bg-gray-100 text-gray-600'}`}>{h.tag}</span>
              <span className="text-sm text-gray-800">{h.text}</span>
            </div>
          ))}
        </div>
      )}
      {issues.length > 0 && (
        <div className="space-y-1">
          {issues.map((iss, i) => (
            <p key={i} className={`text-sm ${iss.startsWith('✓')?'text-green-600':'text-orange-600'}`}>{iss}</p>
          ))}
        </div>
      )}
    </div>
  );
}
