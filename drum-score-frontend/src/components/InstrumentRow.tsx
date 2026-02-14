import type { InstrumentType, NoteData } from '../types/score';
import { INSTRUMENT_FULL_LABELS } from '../types/score';
import NoteCell from './NoteCell';

interface Props {
  instrument: InstrumentType;
  gridSize: number;
  notes: NoteData[];
}

export default function InstrumentRow({ instrument, gridSize, notes }: Props) {
  return (
    <div className="flex items-center border-b border-slate-700 last:border-b-0">
      {/* 파트명 (고정) */}
      <div className="w-20 flex-shrink-0 px-2 py-1 text-xs text-slate-300 border-r border-slate-600 bg-slate-800 sticky left-0 z-10">
        <div className="font-semibold">{INSTRUMENT_FULL_LABELS[instrument]}</div>
      </div>

      {/* 그리드 셀들 */}
      <div className="flex">
        {Array.from({ length: gridSize }, (_, pos) => (
          <NoteCell
            key={pos}
            instrument={instrument}
            position={pos}
            gridSize={gridSize}
            notes={notes}
          />
        ))}
      </div>
    </div>
  );
}
