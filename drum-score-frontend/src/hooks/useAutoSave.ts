import { useEffect, useRef } from 'react';
import { saveBar } from '../api/scoreApi';
import { useScoreStore } from '../store/scoreStore';

/**
 * saveStatus가 'unsaved'가 되면 2초 디바운스 후 자동 저장.
 */
export function useAutoSave() {
  const { score, currentBarNumber, saveStatus, setSaveStatus, getCurrentBar } = useScoreStore();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (saveStatus !== 'unsaved') return;

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (!score) return;

      const bar = getCurrentBar();
      if (!bar) return;

      setSaveStatus('saving');
      try {
        await saveBar(score.id, currentBarNumber, bar.notes);
        setSaveStatus('saved');
      } catch (err) {
        console.error('자동 저장 실패:', err);
        setSaveStatus('unsaved'); // 재시도 가능하도록
      }
    }, 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [saveStatus, score, currentBarNumber, setSaveStatus, getCurrentBar]);
}
