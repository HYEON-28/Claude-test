import { useState } from 'react';
import type { CreateScoreParams } from '../types/score';

interface Props {
  onConfirm: (params: CreateScoreParams) => void;
}

const TIME_SIGNATURES = [
  { label: '4/4', numerator: 4, denominator: 4 },
  { label: '3/4', numerator: 3, denominator: 4 },
  { label: '5/4', numerator: 5, denominator: 4 },
  { label: '6/8', numerator: 6, denominator: 8 },
];

export default function CreateScoreModal({ onConfirm }: Props) {
  const [title, setTitle] = useState('새 악보');
  const [timeSig, setTimeSig] = useState(TIME_SIGNATURES[0]);
  const [tempo, setTempo] = useState(120);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm({
      title,
      timeSigNumerator: timeSig.numerator,
      timeSigDenominator: timeSig.denominator,
      tempo,
    });
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-2xl p-6 w-full max-w-sm border border-slate-700"
      >
        <h2 className="text-white text-xl font-bold mb-5">새 드럼 악보</h2>

        {/* 제목 */}
        <div className="mb-4">
          <label className="block text-slate-300 text-sm mb-1">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 outline-none focus:ring-2 ring-blue-500"
          />
        </div>

        {/* 박자 */}
        <div className="mb-4">
          <label className="block text-slate-300 text-sm mb-1">박자</label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SIGNATURES.map((ts) => (
              <button
                key={ts.label}
                type="button"
                onClick={() => setTimeSig(ts)}
                className={[
                  'py-2 rounded-lg text-sm font-medium transition-colors',
                  timeSig.label === ts.label
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600',
                ].join(' ')}
              >
                {ts.label}
              </button>
            ))}
          </div>
        </div>

        {/* 템포 */}
        <div className="mb-6">
          <label className="block text-slate-300 text-sm mb-1">
            템포 (BPM): <span className="text-white font-bold">{tempo}</span>
          </label>
          <input
            type="range"
            min={40}
            max={300}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>40</span><span>300</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold text-base hover:bg-blue-500 active:bg-blue-700 transition-colors"
        >
          악보 만들기
        </button>
      </form>
    </div>
  );
}
