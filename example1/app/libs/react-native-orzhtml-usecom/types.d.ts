export interface callbackFn {
  (state?: any): void
}

export interface setSingleStateFn<T> {
  (partialStates: Partial<T>, callback?: callbackFn): void;
}

export interface getStateFn<T> {
  (): T
}

export interface setStateFn<T> {
  (newState: Partial<T>, callback?: callbackFn): void;
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
