export interface IEventHandler<T> {
	handle<T> (event: T) : Promise<void>;
}