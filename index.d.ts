export interface callbackFn {
  (): void
}

export type partialStates<T> = { [K in keyof T]?: T[K] };

export interface setSingleStateFn<T> {
  (partialStates: partialStates<T>, callback?: callbackFn): void;
}

export interface getStateFn {
  (): T
}

export interface setStateFn<T> {
  (newState: T, callback?: callbackFn): void;
}

export interface getIntervalValFn<T> {
  (): T
}

export interface setIntervalValFn<T> {
  (val: T): void
}

export function useStateCB<T>(initialState: T): [getStateFn<T>, setStateFn<T>]

export function useSingleState<T>(initialState: T): [T, setSingleStateFn<T>]

export function useSingleInstanceVar<T>(initialState: T): T
