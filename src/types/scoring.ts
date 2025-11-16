import type { BaseModel } from '.';

type StatusScoring = 'in_progress' | 'completed';

export interface StartScoringPayload {
  user_id: string;
  year?: number;
  quarter?: number;
}

export interface ScoringDetail extends BaseModel {
  id: string;
  user_id: string;
  assessor_id: string;
  slug_param: string;
  year: number;
  quarter: number;
  status: StatusScoring;
}

export interface StartScoringResponse {
  slug_param: string;
}
