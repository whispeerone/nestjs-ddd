export interface IPersistable<T> {
    toState(): T;
}
