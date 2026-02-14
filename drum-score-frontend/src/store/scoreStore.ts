import { create } from 'zustand';
import type { BarData, NoteData, ScoreData } from '../types/score';

interface ScoreStore {
  score: ScoreData | null;
  currentBarNumber: number;
  saveStatus: 'saved' | 'saving' | 'unsaved';

  setScore: (score: ScoreData) => void;
  setCurrentBar: (barNumber: number) => void;
  setSaveStatus: (status: 'saved' | 'saving' | 'unsaved') => void;

  // 현재 마디의 음표 토글 (있으면 제거, 없으면 추가)
  toggleNote: (instrument: NoteData['instrument'], position: number) => void;

  getCurrentBar: () => BarData | undefined;
}

export const useScoreStore = create<ScoreStore>((set, get) => ({
  score: null,
  currentBarNumber: 1,
  saveStatus: 'saved',

  setScore: (score) => set({ score }),

  setCurrentBar: (barNumber) => set({ currentBarNumber: barNumber }),

  setSaveStatus: (status) => set({ saveStatus: status }),

  toggleNote: (instrument, position) => {
    const { score, currentBarNumber } = get();
    if (!score) return;

    const updatedBars = score.bars.map((bar) => {
      if (bar.barNumber !== currentBarNumber) return bar;

      const existingIndex = bar.notes.findIndex(
        (n) => n.instrument === instrument && n.position === position
      );

      const newNotes =
        existingIndex >= 0
          ? bar.notes.filter((_, i) => i !== existingIndex) // 제거
          : [...bar.notes, { instrument, position, velocity: 7 }]; // 추가

      return { ...bar, notes: newNotes };
    });

    // 현재 마디가 아직 없다면 새로 추가
    const hasCurrentBar = updatedBars.some((b) => b.barNumber === currentBarNumber);
    if (!hasCurrentBar) {
      updatedBars.push({
        id: 0, // 임시 id, 서버 저장 후 갱신
        barNumber: currentBarNumber,
        notes: [{ instrument, position, velocity: 7 }],
      });
    }

    set({
      score: { ...score, bars: updatedBars },
      saveStatus: 'unsaved',
    });
  },

  getCurrentBar: () => {
    const { score, currentBarNumber } = get();
    return score?.bars.find((b) => b.barNumber === currentBarNumber);
  },
}));
