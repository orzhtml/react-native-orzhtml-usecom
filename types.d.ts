import { Dispatch, SetStateAction } from 'react';

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

export type CancelDebounceFn = () => void;

export type IntervalClear = () => void;
export type IntervalFn = (fn: () => void, delay: number | undefined, immediate?: boolean) => IntervalClear;
export type IntervalHook = [IntervalFn, IntervalClear];

export type FormField<T, D extends FormDataType> = {
  value: T;
  required?: boolean;
  validator?: (value: T, data: D) => string | null | undefined;
  message?: string;
};

export type FormDataType = {
  [key: string]: any;
};

export type FormSubmitResult<T extends FormDataType> = T | { [K in keyof T]?: string };

export type UseFormChangeResult<T extends Record<string, FormField<any, FormDataType>>> = [
  FormDataType,
  (formItem: Partial<FormDataType>) => void,
  { [K in keyof T]?: string },
  () => Promise<FormSubmitResult<FormDataType>>,
  () => void
];