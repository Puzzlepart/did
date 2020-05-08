import { IUserMessageProps } from './IUserMessageProps';
import * as React from 'react';

/**
 * Used to show a temporarily message
 */
export function useMessage(): [IUserMessageProps, (message: IUserMessageProps, duration?: number) => void] {
    const [state, setState] = React.useState<IUserMessageProps>(null);

    /**
     * Set message
     * 
     * @param {IUserMessageProps} message Message
     * @param {number} duration Duration in ms (defaults to 5000)
     */
    function set(message: IUserMessageProps, duration = 5000) {
        setState(message);
        window.setTimeout(() => setState(null), duration);
    }

    return [state, set];
}