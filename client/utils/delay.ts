/**
 * Await a delay
 * 
 * @param {string} ms Delay in ms
*/
export function delay(ms: number) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}