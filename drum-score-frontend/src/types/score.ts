export type InstrumentType =
  | 'KICK'
  | 'SNARE'
  | 'HI_HAT_CLOSED'
  | 'HI_HAT_OPEN'
  | 'HI_HAT_FOOT'
  | 'RIDE'
  | 'CRASH'
  | 'TOM_HIGH'
  | 'TOM_MID'
  | 'TOM_LOW';

export interface NoteData {
  instrument: InstrumentType;
  position: number;    // 0-based grid position
  velocity: number;    // 1-10
}

export interface BarData {
  id: number;
  barNumber: number;
  notes: NoteData[];
}

export interface ScoreData {
  id: number;
  title: string;
  description: string | null;
  timeSigNumerator: number;
  timeSigDenominator: number;
  tempo: number;
  gridSize: number;
  isPublic: boolean;
  bars: BarData[];
  createdAt: string;
  updatedAt: string;
}

export interface ScoreSummary {
  id: number;
  title: string;
  timeSigNumerator: number;
  timeSigDenominator: number;
  tempo: number;
  updatedAt: string;
}

export interface CreateScoreParams {
  title: string;
  description?: string;
  timeSigNumerator: number;
  timeSigDenominator: number;
  tempo: number;
}

// 드럼 파트 표시 정보
export const INSTRUMENT_LABELS: Record<InstrumentType, string> = {
  CRASH:         'CY',  // Crash Cymbal
  RIDE:          'RD',  // Ride Cymbal
  HI_HAT_OPEN:  'OH',  // Open Hi-Hat
  HI_HAT_CLOSED:'HH',  // Closed Hi-Hat
  TOM_HIGH:     'HT',  // High Tom
  TOM_MID:      'MT',  // Mid Tom
  SNARE:        'SD',  // Snare Drum
  TOM_LOW:      'FT',  // Floor Tom
  KICK:         'BD',  // Bass Drum (Kick)
  HI_HAT_FOOT:  'HF',  // Hi-Hat Foot
};

export const INSTRUMENT_FULL_LABELS: Record<InstrumentType, string> = {
  CRASH:         '크래시',
  RIDE:          '라이드',
  HI_HAT_OPEN:  '오픈 하이햇',
  HI_HAT_CLOSED:'하이햇',
  TOM_HIGH:     '하이 탐',
  TOM_MID:      '미드 탐',
  SNARE:        '스네어',
  TOM_LOW:      '플로어 탐',
  KICK:         '킥',
  HI_HAT_FOOT:  '하이햇 발',
};

// 악보에서 위에서 아래 순서
export const INSTRUMENT_ORDER: InstrumentType[] = [
  'CRASH',
  'RIDE',
  'HI_HAT_OPEN',
  'HI_HAT_CLOSED',
  'TOM_HIGH',
  'TOM_MID',
  'SNARE',
  'TOM_LOW',
  'KICK',
  'HI_HAT_FOOT',
];

// 심벌류 (x 표시), 드럼류 (● 표시)
export const CYMBAL_INSTRUMENTS = new Set<InstrumentType>([
  'CRASH', 'RIDE', 'HI_HAT_OPEN', 'HI_HAT_CLOSED', 'HI_HAT_FOOT',
]);
