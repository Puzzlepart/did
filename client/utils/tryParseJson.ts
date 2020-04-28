/**
 * Try parse JSON
 * 
 * @param {string} str String to parse
 * @param {any} fallbackValue Fallback value (default to empty object)
 */
export function tryParseJson(str: string, fallbackValue: any = {}) {
    try {
        return JSON.parse(str);
    } catch {
        return {};
    }
}