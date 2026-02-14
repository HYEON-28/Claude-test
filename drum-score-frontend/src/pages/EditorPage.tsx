import { useEffect, useState } from 'react';
import { createScore } from '../api/scoreApi';
import BarNavigation from '../components/BarNavigation';
import CreateScoreModal from '../components/CreateScoreModal';
import DrumGrid from '../components/DrumGrid';
import ScoreHeader from '../components/ScoreHeader';
import { useAutoSave } from '../hooks/useAutoSave';
import { useScoreStore } from '../store/scoreStore';
import type { CreateScoreParams } from '../types/score';

export default function EditorPage() {
  const { score, setScore } = useScoreStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 자동 저장 훅 활성화
  useAutoSave();

  const showModal = !score;

  async function handleCreateScore(params: CreateScoreParams) {
    setLoading(true);
    setError(null);
    try {
      const newScore = await createScore(params);
      setScore(newScore);
    } catch (e) {
      setError('악보를 생성할 수 없습니다. 서버 연결을 확인해주세요.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">악보 생성 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {showModal && (
        <CreateScoreModal onConfirm={handleCreateScore} />
      )}

      {error && (
        <div className="bg-red-900/50 text-red-300 text-sm px-4 py-2 text-center">
          {error}
        </div>
      )}

      {score && (
        <>
          <ScoreHeader />

          <main className="flex-1 overflow-hidden flex flex-col">
            {/* 마디 네비게이션 */}
            <div className="px-3 py-2 bg-slate-850 border-b border-slate-700">
              <BarNavigation />
            </div>

            {/* 드럼 그리드 (가로 스크롤) */}
            <div className="flex-1 overflow-x-auto p-3">
              <DrumGrid />
            </div>

            {/* 하단 도움말 */}
            <div className="px-4 py-2 text-center text-xs text-slate-600 border-t border-slate-800">
              셀을 탭해서 음표를 추가/제거하세요 • 2초 후 자동 저장
            </div>
          </main>
        </>
      )}
    </div>
  );
}
