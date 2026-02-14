import type { InstrumentType, NoteData } from '../types/score';
import { CYMBAL_INSTRUMENTS } from '../types/score';
import { useScoreStore } from '../store/scoreStore';

interface Props {
  instrument: InstrumentType;
  position: number;
  gridSize: number;
  notes: NoteData[];
}

export default function NoteCell({ instrument, position, gridSize, notes }: Props) {
  const toggleNote = useScoreStore((s) => s.toggleNote);

  const isActive = notes.some(
    (n) => n.instrument === instrument && n.position === position
  );

  // 박자 구분선: 4분음표 단위 (16분음표 4개마다)
  const isBeatStart = position % 4 === 0;
  const isHalfBeat = position % 2 === 0 && !isBeatStart;
  const isLastCell = position === gridSize - 1;

  const isCymbal = CYMBAL_INSTRUMENTS.has(instrument);

  return (
    <button
      className={[
        'relative flex items-center justify-center select-none',
        'h-8 w-8 flex-shrink-0',
        'border-r border-slate-700',
        isBeatStart && 'border-l-2 border-l-slate-400',
        isHalfBeat && 'border-l border-l-slate-600',
        isLastCell && 'border-r-0',
        'active:opacity-70 transition-opacity',
      ].filter(Boolean).join(' ')}
      onPointerDown={() => toggleNote(instrument, position)}
    >
      {isActive ? (
        isCymbal ? (
          // 심벌: X 표시
          <span className="text-yellow-400 font-bold text-sm leading-none">✕</span>
        ) : (
          // 드럼: 채워진 원
          <span className="w-4 h-4 rounded-full bg-slate-200 block" />
        )
      ) : (
        // 빈 칸: 가이드 점
        <span className="w-1 h-1 rounded-full bg-slate-700 block" />
      )}
    </button>
  );
}
