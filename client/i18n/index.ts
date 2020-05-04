/* eslint-disable @typescript-eslint/camelcase */
import i18n from 'i18next';
import languages from '../../resources';

/**
 * Returns the resource value for the specified key
 * 
 * @param {string} key Key
 * 
 * @ignore
 */
export default function resource(key: string): string {
    return i18n.t(key);
}

/**
 * Setup i18n with default namespace translation
 * 
 * @param {string} lng Language (defaults to en)
 * 
 * @ignore
 */
export async function setup(lng = 'en'): Promise<void> {
    const resources = Object.keys(languages).reduce((obj, key) => ({
        ...obj,
        [key]: languages[key]
    }), {});
    await i18n.init({
        debug: false,
        lng,
        resources,
    });
}

export { languages };
