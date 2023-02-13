import { MutableRefObject } from 'react';
import { getStateFn, setStateFn } from './types';

declare module 'react-native-orzhtml-usecom' {
    export function useDebounce(fn: () => void, ms?: number, deps?: any[]): () => void;
    export function useFormChange<T>(s: T): [s: T, setFormItem: (keys: string, value: any) => void, resetForm: () => void];
    export function useInterval(): [interval: (fn: () => void, delay?: number | undefined, immediate?: boolean) => void, clear: () => void];
    export function useLatest<T>(s: T): MutableRefObject<T>;
    export function useSingleInstanceVar<T>(s: T): T;
    export function useSingleState<T> (initialState: T | (() => T)): [T, setStateFn<T>];
    export function useStateCB<T> (initialState: T | (() => T)): [getStateFn<T>, setStateFn<T>];
    export function useTableRequset<T, R> (query: T, api: (arg0: any) => Promise<R | any>);
    export function useThrottle(fn: () => void, ms?: number, deps?: any[]): any;
    export function useTimeout(): any;
    export function useUnmountedRef(): any;
    export function useUpdate(): () => void;
}
