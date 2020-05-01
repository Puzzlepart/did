export function tryParseJson<T>(str: string, fallbackValue: T = {} as T) {
    try {
        return JSON.parse(str);
    } catch (error) {
        return fallbackValue;
    }
}