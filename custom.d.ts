interface Callable {
    (data?: any): string;
}

declare module "*.hbs" {
    const _: Callable;
    export default _;
}

declare module 'event-emitter' {
    class EE {
        constructor();
        addListener(event: string, listener: (data: any) => void): void;
        emit(event: string, data: any): void;
    }
    export default EE;
}