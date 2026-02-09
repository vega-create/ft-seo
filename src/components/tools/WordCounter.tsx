import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const readTime = Math.max(1, Math.ceil(words / 225));

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Start typing or paste your content..." className="w-full h-56 p-4 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {[['Words',words],['Characters',chars],['No Spaces',charsNoSpace],['Sentences',sentences],['Paragraphs',paragraphs],['Read Time',readTime+'m']].map(([l,v]) => (
          <div key={l as string} className="bg-white border border-gray-100 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-gray-900">{v}</div>
            <div className="text-xs text-gray-500 mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
