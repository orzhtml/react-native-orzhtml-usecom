export interface CallbackFn {
  (state?: any): void;
}

export interface GetStateFn<T> {
  (): T;
}

export interface SetStateFn<T> {
  (newState: Partial<T>, callback?: CallbackFn): void;
}

export interface SetSingleStateFn<T> {
  (partialStates: Partial<T>, callback?: CallbackFn): void;
}

export type KeyOf<T> = Extract<keyof T, string>

export type FormField<T> = {
  value: T;
  required?: boolean;
  message?: string;
  validator?: (value: T) => string | undefined;
};

export type UseFormChangeResult<T> = [
  TransformedFormData<T>,
  (formItem: Partial<TransformedFormData<T>>) => void,
  { [K in keyof TransformedFormData<T>]?: string },
  () => Promise<TransformedFormData<T>>,
  () => void
];

export type TransformedFormData<T> = {
  [K in keyof T]: T[K] extends FormField<infer V> ? V : never;
};

export type CancelDebounceFn = () => void;

export type IntervalClear = () => void;
export type IntervalFn = (fn: () => void, delay: number | undefined, immediate?: boolean) => IntervalClear;
export type IntervalHook = [IntervalFn, IntervalClear];
