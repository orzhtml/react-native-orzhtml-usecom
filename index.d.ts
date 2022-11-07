import { callbackFn, getStateFn, setStateFn } from "./types";

declare module 'react-native-orzhtml-usecom' {
    export function useDebounce(fn: () => void, ms?: number, deps?: any[]): () => void;
    export function useFormChange<T>(T: any): [T: any, setFormItem: (keys: string, value: any) => void, resetForm: () => void]
    export function useInterval(): [interval: (fn: () => void, delay?: number | undefined, immediate?: boolean) => void, clear: () => void]
    export function useLatest<T>(T: any): any
    export function useSingleInstanceVar<T>(T: any): any
    export function useSingleState<T>(T: any): [T: any, newSetState: (T: any, callback?: callbackFn) => void]
    export function useStateCB<T>(T: any): [getStateFn<any>, setStateFn<any>];
    export function useTableRequset(query: any, api: any): any;
    export function useThrottle(fn: () => void, ms?: number, deps?: any[]): any;
    export function useTimeout(): any;
    export function useUnmountedRef(): any;
    export function useUpdate(): () => void;
}
