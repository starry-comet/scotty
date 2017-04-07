export type Resolve<T> = (value: T | Promise<T>) => void
export type Reject<T extends Error> = (value: T | Promise<T>) => void

export function $q<T>(executor: (resolve: Resolve<T>, reject: Reject<Error>) => void): Promise<T> {
  return new Promise(executor)
}
