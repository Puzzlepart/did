import i18n from 'i18next';
import { ITypedHash } from '@pnp/common';

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
 * @param {ITypedHash} languages Languages
 * 
 * @ignore
 */
export async function setup(languages: ITypedHash<any>): Promise<boolean> {
    await i18n.init({
        debug: false,
        fallbackLng: 'en',
        resources: Object.keys(languages).reduce((obj, key) => ({
            ...obj,
            [key]: {
                translation: languages[key],
            }
        }), {})
    });
    return true;
}