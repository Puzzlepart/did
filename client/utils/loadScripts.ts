import * as $script from 'scriptjs';

/**
 * Load scripts
 * 
 * @param {string[]} src Source to load
 * 
 * @category Utility
 */
export function loadScripts(src: string[]) {
    return new Promise((resolve) => {
        $script(src, 'src');
        $script.ready('src', resolve);
    });
}