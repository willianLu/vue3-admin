export type RequiredPick<T, K extends keyof T> = {
  [P in K]-?: T[P]
} & {
  [P in Exclude<keyof T, K>]: T[P]
}

export interface StorageOptions {
  maxAge?: number | string
  timestamp?: number
}

export type StorageData = {
  value: any
} & StorageOptions
