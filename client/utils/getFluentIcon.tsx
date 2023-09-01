import {
    ArrowUndo24Filled,
    ArrowUndo24Regular,
    bundleIcon,
    CalendarCancel24Filled,
    CalendarCancel24Regular,
    FastForward24Filled,
    FastForward24Regular,
    TableEdit24Regular,
    TableEdit24Filled,
    WebAsset24Regular,
    WebAsset24Filled,
    System24Regular,
    System24Filled,
    CalendarAdd24Regular,
    CalendarAdd24Filled
} from '@fluentui/react-icons'
import React from 'react'

const iconCatalog = {
    CalendarCancel: {
        regular: CalendarCancel24Regular,
        filled: CalendarCancel24Filled
    },
    ArrowUndo: {
        regular: ArrowUndo24Regular,
        filled: ArrowUndo24Filled
    },
    FastForward: {
        regular: FastForward24Regular,
        filled: FastForward24Filled
    },
    TableEdit: {
        regular: TableEdit24Regular,
        filled: TableEdit24Filled
    },
    WebAsset: {
        regular: WebAsset24Regular,
        filled: WebAsset24Filled
    },
    System: {
        regular: System24Regular,
        filled: System24Filled
    },
    CalendarAdd: {
        regular: CalendarAdd24Regular,
        filled: CalendarAdd24Filled
    }
}

export type FluentIconName = keyof typeof iconCatalog

/**
 * Returns the Fluent icon with the specified name.
 *
 * @param name - The name of the icon to retrieve.
 * @param bundle - Whether to bundle the filled and regular versions of the icon. Defaults to true.
 *
 * @returns The specified Fluent icon.
 */
export function getFluentIcon(name: FluentIconName, bundle = true) {
    const icon = iconCatalog[name]
    const Icon = bundle ? bundleIcon(icon.filled, icon.regular) : icon.regular
    return <Icon />
}
