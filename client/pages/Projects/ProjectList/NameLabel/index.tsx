import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NameLabel.module.scss'
import { INameLabelProps } from './types'

export const NameLabel = ({ project,  renderLink }: INameLabelProps) => {
    return (
        <div className={styles.root}>
            {renderLink
                ? <Link to={`/projects/search/${project.id}`}>{project.name}</Link>
                : (
                    <div>
                        <span>{project.name}</span>
                    </div>
                )
            }
        </div>
    )
}
