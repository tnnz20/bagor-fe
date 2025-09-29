import type { BaseModel } from '.';

export interface Employee extends BaseModel {
  id: number;
  name: string;
  position: string;
  avatarUrl: string;
  score: number;
}
