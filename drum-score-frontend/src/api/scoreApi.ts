import axios from 'axios';
import type { BarData, CreateScoreParams, NoteData, ScoreData, ScoreSummary } from '../types/score';
import { getGuestId } from '../utils/guestId';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// 요청마다 X-Guest-Id 헤더 자동 첨부
api.interceptors.request.use((config) => {
  config.headers['X-Guest-Id'] = getGuestId();
  return config;
});

// ── BarResponse → BarData 변환 ───────────────────────────

interface RawBarResponse {
  id: number;
  barNumber: number;
  notes: string; // JSON 문자열
}

function parseBar(raw: RawBarResponse): BarData {
  return {
    id: raw.id,
    barNumber: raw.barNumber,
    notes: JSON.parse(raw.notes) as NoteData[],
  };
}

interface RawScoreResponse extends Omit<ScoreData, 'bars'> {
  bars: RawBarResponse[];
}

function parseScore(raw: RawScoreResponse): ScoreData {
  return {
    ...raw,
    bars: raw.bars.map(parseBar),
  };
}

// ── API 함수 ────────────────────────────────────────────

export async function createScore(params: CreateScoreParams): Promise<ScoreData> {
  const { data } = await api.post<RawScoreResponse>('/guest/scores', params);
  return parseScore(data);
}

export async function getScores(): Promise<ScoreSummary[]> {
  const { data } = await api.get<ScoreSummary[]>('/guest/scores');
  return data;
}

export async function getScore(scoreId: number): Promise<ScoreData> {
  const { data } = await api.get<RawScoreResponse>(`/guest/scores/${scoreId}`);
  return parseScore(data);
}

export async function updateScoreMeta(scoreId: number, params: CreateScoreParams): Promise<ScoreData> {
  const { data } = await api.put<RawScoreResponse>(`/guest/scores/${scoreId}`, params);
  return parseScore(data);
}

export async function saveBar(scoreId: number, barNumber: number, notes: NoteData[]): Promise<BarData> {
  const { data } = await api.put<RawBarResponse>(
    `/guest/scores/${scoreId}/bars/${barNumber}`,
    { notes: JSON.stringify(notes) }
  );
  return parseBar(data);
}
