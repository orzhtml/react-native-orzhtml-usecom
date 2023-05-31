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

export type FormField<T> = {
  value: T;
  required?: boolean;
  message?: string;
  validator?: (value: T) => string | undefined;
};

export type FormSubmitResult<T> = {
  formData: T;
  errors?: { [K in keyof T]?: string };
};

export type KeyOf<T> = Extract<keyof T, string>

export type UseFormChangeResult<T> = [
  T,
  <K extends keyof T>(key: K, value: Extract<T[K], { value: any }>['value']) => void,
  { [K in keyof T]?: string },
  () => FormSubmitResult<T>,
  () => void
];

export type CancelDebounceFn = () => void;

export type IntervalClear = () => void;
export type IntervalFn = (fn: () => void, delay: number | undefined, immediate?: boolean) => IntervalClear;
export type IntervalHook = [IntervalFn, IntervalClear];