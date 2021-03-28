/* eslint-disable unicorn/prevent-abbreviations */
import path from 'path'
import { environment } from './environment'

/**
 * Plays a mp3 file using `play-sound`
 * 
 * @remarks Only works if `NODE_ENV` is set to **development**
 *
 * @param dir - Directory
 * @param file - Sound file (.mp3) to play
 */
export function sound(dir: string, file: string): void {
    if (environment('NODE_ENV') !== 'development') return
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('play-sound')().play(path.resolve(dir, file))
    
}
