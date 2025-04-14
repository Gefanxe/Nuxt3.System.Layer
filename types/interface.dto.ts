export interface AuthData {
  id: number
  account: string
  name: string
  email: string
}

export type MayBe<T> = T | (null | undefined);

export enum Status {
  未登入 = 0,
  已登入 = 1,
}
