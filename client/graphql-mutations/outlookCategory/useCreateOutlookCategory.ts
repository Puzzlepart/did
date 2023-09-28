/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from '@apollo/client'
import { useCallback } from 'react'
import { CreateOutlookCategoryResult } from 'types'
import $createOutlookCategory from './createOutlookCategory.gql'


/**
 * A hook for creating an Outlook category.
 * 
 * @returns A function that takes a category string and a callback 
 * function as arguments. The callback function will be called with 
 * the result of the mutation.
 */
export function useCreateOutlookCategory() {
    const [createOutlookCategory] = useMutation<{result:CreateOutlookCategoryResult}>($createOutlookCategory)

    return useCallback(async (category: string) => {
        const {
            data: { result }
        } = await createOutlookCategory({
            variables: { category }
        })
        return result
    }, [createOutlookCategory])
}