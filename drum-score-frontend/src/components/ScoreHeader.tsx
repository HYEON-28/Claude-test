import { useState } from 'react';
import { useScoreStore } from '../store/scoreStore';

const TIME_SIGNATURES = [
  { label: '4/4', numerator: 4, denominator: 4 },
  { label: '3/4', numerator: 3, denominator: 4 },
  { label: '5/4', numerator: 5, denominator: 4 },
  { label: '6/8', numerator: 6, denominator: 8 },
];

export default function ScoreHeader() {
  const { score, saveStatus } = useScoreStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  if (!score) return null;

  const saveStatusLabel = {
    saved: '저장됨',
    saving: '저장 중...',
    unsaved: '미저장',
  }[saveStatus];

  const saveStatusColor = {
    saved: 'text-green-400',
    saving: 'text-yellow-400',
    unsaved: 'text-slate-400',
  }[saveStatus];

  return (
    <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
      {/* 제목 */}
      <div className="flex items-center justify-between mb-2">
        {isEditingTitle ? (
          <input
            autoFocus
            defaultValue={score.title}
            onBlur={() => setIsEditingTitle(false)}
            className="bg-transparent text-white text-lg font-bold border-b border-blue-400 outline-none w-full mr-4"
          />
        ) : (
          <h1
            className="text-white text-lg font-bold cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {score.title}
          </h1>
        )}
        <span className={`text-xs ${saveStatusColor} flex-shrink-0`}>{saveStatusLabel}</span>
      </div>

      {/* 박자 / 템포 정보 */}
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-1">
          <span>박자:</span>
          <span className="text-slate-200 font-medium">
            {score.timeSigNumerator}/{score.timeSigDenominator}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span>♩=</span>
          <span className="text-slate-200 font-medium">{score.tempo}</span>
        </div>
        <div className="ml-auto text-xs text-slate-500">
          그리드: {score.gridSize}칸/마디
        </div>
      </div>
    </div>
  );
}
