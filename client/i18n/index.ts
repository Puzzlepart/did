/* eslint-disable @typescript-eslint/camelcase */
import i18n from 'i18next';

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
 * @param resources
 * @param {string} lng Language (defaults to en)
 * 
 * @ignore
 */
export async function setup(resources, lng = 'en'): Promise<void> {
    await i18n.init({
        debug: false,
        lng,
        defaultNS: 'translation',
        resources,
    });
}
