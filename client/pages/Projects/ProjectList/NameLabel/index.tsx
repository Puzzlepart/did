import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ContextualMenu } from 'office-ui-fabric-react'
import styles from './NameLabel.module.scss'

export const NameLabel = ({ project, actions }) => {
    const target = useRef()
    const [showMenu, setShowMenu] = useState(false)

    function onShowMenu(event: React.MouseEvent<any>) {
        event.preventDefault()
        event.stopPropagation()
        setShowMenu(true)
    }

    return (
        <div className={styles.root}>
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
            <span
                ref={target}
                onClick={onShowMenu}
                className={styles.menuToggle} >
                <Icon iconName='More' />
            </span>
            <ContextualMenu
                hidden={!showMenu}
                onDismiss={() => setShowMenu(false)}
                target={target.current}
                items={actions} />
        </div>
    )
}
