export type BaseApi<T = undefined> = T extends undefined
  ? { code: number; message: string }
  : { code: number; message: string; data?: T | null };
