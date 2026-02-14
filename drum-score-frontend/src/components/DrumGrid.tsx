import { useScoreStore } from '../store/scoreStore';
import { INSTRUMENT_ORDER } from '../types/score';
import InstrumentRow from './InstrumentRow';

export default function DrumGrid() {
  const { score, currentBarNumber } = useScoreStore();

  if (!score) return null;

  const currentBar = score.bars.find((b) => b.barNumber === currentBarNumber);
  const notes = currentBar?.notes ?? [];
  const gridSize = score.gridSize;

  // 박자 위치 헤더 (1, 2, 3, 4 표시)
  const beatCount = score.timeSigNumerator;

  return (
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      {/* 박자 헤더 */}
      <div className="flex border-b border-slate-600">
        <div className="w-20 flex-shrink-0 bg-slate-800 sticky left-0 z-10" />
        <div className="flex">
          {Array.from({ length: gridSize }, (_, pos) => {
            const cellsPerBeat = gridSize / beatCount;
            const isBeatStart = pos % cellsPerBeat === 0;
            const beatNum = Math.floor(pos / cellsPerBeat) + 1;
            return (
              <div
                key={pos}
                className={[
                  'w-8 h-5 flex-shrink-0 flex items-center justify-center',
                  'text-[10px] text-slate-500 border-r border-slate-800',
                  isBeatStart && 'text-slate-300 font-bold',
                ].filter(Boolean).join(' ')}
              >
                {isBeatStart ? beatNum : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* 드럼 파트 행 */}
      <div className="overflow-x-auto">
        {INSTRUMENT_ORDER.map((instrument) => (
          <InstrumentRow
            key={instrument}
            instrument={instrument}
            gridSize={gridSize}
            notes={notes}
          />
        ))}
      </div>
    </div>
  );
}
