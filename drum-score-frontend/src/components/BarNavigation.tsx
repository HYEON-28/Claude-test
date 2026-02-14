import { useScoreStore } from '../store/scoreStore';
import { saveBar } from '../api/scoreApi';

const MAX_BARS = 32;

export default function BarNavigation() {
  const { score, currentBarNumber, setCurrentBar, setSaveStatus, getCurrentBar } = useScoreStore();

  if (!score) return null;

  const totalBars = Math.max(score.bars.length, currentBarNumber);

  async function flushAndGo(targetBar: number) {
    if (!score) return;
    // 이동 전 현재 마디 즉시 저장
    const bar = getCurrentBar();
    if (bar) {
      setSaveStatus('saving');
      try {
        await saveBar(score.id, currentBarNumber, bar.notes);
        setSaveStatus('saved');
      } catch {
        setSaveStatus('unsaved');
      }
    }
    setCurrentBar(targetBar);
  }

  async function addBar() {
    const next = totalBars + 1;
    if (next > MAX_BARS) return;
    await flushAndGo(next);
  }

  return (
    <div className="flex items-center gap-3 px-1">
      <button
        onClick={() => flushAndGo(currentBarNumber - 1)}
        disabled={currentBarNumber <= 1}
        className="w-9 h-9 rounded-full bg-slate-700 text-white disabled:opacity-30 text-lg flex items-center justify-center"
      >
        ‹
      </button>

      {/* 마디 번호 표시 */}
      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(totalBars, 8) }, (_, i) => {
          const barNum = i + 1;
          return (
            <button
              key={barNum}
              onClick={() => flushAndGo(barNum)}
              className={[
                'w-7 h-7 rounded text-xs font-medium transition-colors',
                barNum === currentBarNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600',
              ].join(' ')}
            >
              {barNum}
            </button>
          );
        })}
        {totalBars > 8 && (
          <span className="text-slate-400 text-xs px-1">
            ... {currentBarNumber > 8 ? `${currentBarNumber}마디` : ''}
          </span>
        )}
      </div>

      <button
        onClick={() => flushAndGo(currentBarNumber + 1)}
        disabled={currentBarNumber >= totalBars}
        className="w-9 h-9 rounded-full bg-slate-700 text-white disabled:opacity-30 text-lg flex items-center justify-center"
      >
        ›
      </button>

      {currentBarNumber === totalBars && totalBars < MAX_BARS && (
        <button
          onClick={addBar}
          className="ml-1 px-3 h-9 rounded bg-slate-600 text-slate-300 text-sm hover:bg-slate-500"
        >
          + 마디 추가
        </button>
      )}

      <span className="ml-auto text-slate-400 text-xs">
        {currentBarNumber} / {totalBars} 마디
      </span>
    </div>
  );
}
