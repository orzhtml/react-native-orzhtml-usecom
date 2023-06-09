import React, { DependencyList } from 'react';
import type { CancelDebounceFn, FormField, IntervalHook, UseFormChangeResult } from './types';

declare module 'react-native-orzhtml-usecom' {
    export function useDebounce(
        fn: () => void,
        ms?: number,
        deps?: DependencyList
    ): [CancelDebounceFn];
    export function useFormChange<T extends Record<string, FormField<any>>>(
        initialState: T, configs?: {
            errMessage: string,
        }
    ): UseFormChangeResult<T>;
    export function useInterval(): IntervalHook;
    export function useLatest<T>(value: T): React.MutableRefObject<T>;
    export function useUpdate(): () => void;
    export function useSingleInstanceVar<T extends Record<string, any>>(initialValue: T): T;
    export function useSingleState<T>(initialState: T | (() => T)): [T, (partialStates: Partial<T>, callback?: () => void) => void];
    export function useStateCB<T>(initialState: T | (() => T)): [() => T, (partialStates: Partial<T>, callback?: (state: T) => void) => void];
    export function useThrottle(
        fn: () => void,
        ms?: number,
        deps?: DependencyList,
    ): [() => void];
    export function useTimeout(): readonly [(fn: () => void, delay: number | undefined) => void, () => void];
    export function useUnmountedRef(): React.MutableRefObject<boolean>;
}
