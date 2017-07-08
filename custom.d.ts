interface Callable {
    (data?: any): string;
}

declare module "*.hbs" {
    const _: Callable;
    export default _;
}