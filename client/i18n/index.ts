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
 * @param {string} defaultNS Default namespace
 * 
 * @ignore
 */
export async function setup(languages: ITypedHash<any>, defaultNS = 'translation'): Promise<boolean> {
    await i18n.init({
        debug: false,
        fallbackLng: 'en',
        defaultNS,
        resources: Object.keys(languages).reduce((obj, key) => ({
            ...obj,
            [key]: { [defaultNS]: languages[key] }
        }), {})
    });
    return true;
}