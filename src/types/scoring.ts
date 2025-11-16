export type StartScoringPayload = {
  user_id: string;
  year?: number;
  quarter?: number;
};

export interface StartScoringResponse {
  slug_param: string;
}
