import React from 'react';

import type { FormDataType, FormField, UseFormChangeResult, IntervalHook, DebounceOptions, DebounceFn, ThrottleOptions, ThrottledFn, UseMockRequestReturn } from './types';

declare module 'react-native-orzhtml-usecom' {
    export function useDebounce<T extends (...args: any[]) => any>(func: T, config: number | DebounceOptions): DebounceFn<T>;
    export function useFormChange<T extends Record<string, FormField<any, FormDataType>>>(
        initialState: T,
        configs?: { errMessage: string },
      ): UseFormChangeResult<T>;
    export function useInterval(): IntervalHook;
    export function useLatest<T>(value: T): React.MutableRefObject<T>;
    export function useMockRequest<T = any>(): UseMockRequestReturn<T>;
    export function useSingleInstanceVar<T extends Record<string, any>>(initialValue: T): T;
    export function useSingleState<T>(initialState: T | (() => T)): [T, (partialStates: Partial<T>, callback?: (state: T) => void) => void];
    export function useStateCB<T>(initialState: T | (() => T)): [() => T, (partialStates: Partial<T>, callback?: (state: T) => void) => void];
    export function useThrottle<T extends (...args: any[]) => any>(func: T, config: number | ThrottleOptions): ThrottledFn<T>;
    export function useTimeout(): readonly [(fn: Function, delay: number) => void, () => void];
    export function useUnmountedRef(): React.MutableRefObject<boolean>;
    export function useUpdate(): () => void;
    export function useWorkdayCalculator(initialDate: Date): Date;
}
