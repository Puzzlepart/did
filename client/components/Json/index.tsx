/* eslint-disable tsdoc/syntax */
import { ReusableComponent } from 'components/types'
import React from 'react'

/**
 * Simple componet showing the specified obj in a
 * `<pre />` element
 * 
 * @category Reusable Component
 */
export const Json: ReusableComponent<any> = ({ obj, replacer = null, space = 4 }) => (
    <div style={{
        backgroundColor: '#444',
        color: '#fff',
        padding: 20,
        marginBottom: 20,
        marginTop: 20
    }}>
        <pre>
            {JSON.stringify(obj, replacer, space)}
        </pre>
    </div>
)