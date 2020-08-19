import { AppContext } from 'AppContext'
import { ContextualMenu } from 'office-ui-fabric-react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { contains } from 'underscore'
import styles from './NameLabel.module.scss'
import { manageProjects } from 'config/security/permissions'

export const NameLabel = ({ project, actions }) => {
    const target = useRef()
    const { user } = React.useContext(AppContext)
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
                {contains(user.role.permissions, manageProjects) && <Icon iconName='More' />} 
            </span>
            <ContextualMenu
                hidden={!showMenu}
                onDismiss={() => setShowMenu(false)}
                target={target.current}
                items={actions} />
        </div>
    )
}
