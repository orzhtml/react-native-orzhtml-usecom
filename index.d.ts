import { callbackFn, getStateFn, setStateFn } from "./types";

declare module 'react-native-orzhtml-usecom' {
    export function useDebounce(fn: () => void, ms?: number, deps?: any[]): () => void;
    export function useFormChange<T>(s: T): [s: T, setFormItem: (keys: string, value: any) => void, resetForm: () => void]
    export function useInterval(): [interval: (fn: () => void, delay?: number | undefined, immediate?: boolean) => void, clear: () => void]
    export function useLatest<T>(s: T): any
    export function useSingleInstanceVar<T>(s: T): any
    export function useSingleState<T>(s: T): [s: T, newSetState: (s: T, callback?: callbackFn) => void]
    export function useStateCB<T>(s: T): [getStateFn<T>, setStateFn<T>];
    export function useTableRequset(query: any, api: any): any;
    export function useThrottle(fn: () => void, ms?: number, deps?: any[]): any;
    export function useTimeout(): any;
    export function useUnmountedRef(): any;
    export function useUpdate(): () => void;
}
