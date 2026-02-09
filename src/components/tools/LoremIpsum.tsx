import { useState } from 'react';

const lorem = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt'.split(' ');

function genSentence() {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = Array.from({length:len}, () => lorem[Math.floor(Math.random()*lorem.length)]);
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}
function genParagraph() { return Array.from({length: 4+Math.floor(Math.random()*4)}, genSentence).join(' '); }

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs'|'sentences'|'words'>('paragraphs');
  const [output, setOutput] = useState('');

  const generate = () => {
    if (type === 'paragraphs') setOutput(Array.from({length:count}, genParagraph).join('\n\n'));
    else if (type === 'sentences') setOutput(Array.from({length:count}, genSentence).join(' '));
    else { const w: string[] = []; while(w.length<count) w.push(lorem[Math.floor(Math.random()*lorem.length)]); w[0]=w[0][0].toUpperCase()+w[0].slice(1); setOutput(w.join(' ')+'.'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div><label className="text-xs text-gray-500">Count</label><input type="number" value={count} onChange={e => setCount(Math.max(1,+e.target.value))} min="1" max="100" className="w-20 px-3 py-2 border border-gray-200 rounded-lg" /></div>
        <div className="flex gap-1">{(['paragraphs','sentences','words'] as const).map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-lg text-sm ${type===t?'bg-teal-600 text-white':'bg-gray-100 text-gray-600'}`}>{t}</button>
        ))}</div>
        <button onClick={generate} className="px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600">Generate</button>
      </div>
      {output && (
        <div className="relative">
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">{output}</div>
          <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-3 right-3 px-3 py-1 bg-teal-600 text-white rounded text-xs">Copy</button>
        </div>
      )}
    </div>
  );
}
