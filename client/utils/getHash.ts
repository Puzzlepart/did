/**
 * Get hash
 * 
 * @param {Object} options Options
 * 
 * @category Utility
 */
export function getHash(options: { parseInt?: boolean, fallback?: string } = {}): any {
    if (!document.location.hash) return options.fallback;
    let value = decodeURIComponent(document.location.hash.substring(1));
    if (options.parseInt) return parseInt(value.replace(/\D+/g, ''));
    return value || options.fallback;
}