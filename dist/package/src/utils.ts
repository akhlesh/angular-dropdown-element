export function identity<T>(item: T): T{
    return item;
}

export function isString(str: string) {
    return typeof str === 'string';
}

export enum keys {
    Tab = 9,
    Enter = 13,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Escape = 27,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
}