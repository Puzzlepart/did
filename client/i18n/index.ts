/* eslint-disable @typescript-eslint/camelcase */
import i18n from 'i18next';

/**
 * Returns the resource value for the specified key
 * 
 * @param {string} key Key
 * @param {boolean} returnObj Accessing an object not a translation string
 * 
 * @ignore
 */
export default function resource(key: string, returnObj = false): string {
    return i18n.t(key, { returnObjects: returnObj });
}

/**
 * Setup i18n with default namespace translation
 * 
 * @param {any} resources Resources
 * @param {string} lng Language
 * 
 * @ignore
 */
export const setup = (resources: any, lng: string) => i18n.init({
    debug: false,
    lng,
    defaultNS: 'translation',
    resources,
});
