import i18n from 'i18next';

/**
 * Returns the resource value for the specified key
 * 
 * @param {string} key Key
 */
export default function resource(key: string): string {
    return i18n.t(key);
} 