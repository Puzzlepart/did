import { Link } from '@fluentui/react-components'
import { EntityLabel } from 'components/EntityLabel'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { StyledComponent } from 'types'
import { TimeColumn } from '../TimeColumn'
import styles from './TitleColumn.module.scss'
import { ITitleColumnProps } from './types'

export const TitleColumn: StyledComponent<ITitleColumnProps> = (props) => {
  const titleRef = useRef<HTMLSpanElement>(null)
  const [isWrapped, setIsWrapped] = useState<boolean>(false)

  useLayoutEffect(() => {
    const titleElement = titleRef.current
    if (!titleElement || typeof window === 'undefined') return
    const updateWrapState = () => {
      const isNarrow =
        window.matchMedia?.('(max-width: 600px)').matches ?? false
      if (!isNarrow || !props.displayTime) {
        setIsWrapped(false)
        return
      }
      const nextWrapped = titleElement.getClientRects().length > 1
      setIsWrapped((prev) => (prev === nextWrapped ? prev : nextWrapped))
    }

    updateWrapState()
    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateWrapState)
      observer.observe(titleElement)
    }
    window.addEventListener('resize', updateWrapState)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updateWrapState)
    }
  }, [props.displayTime, props.event.title])

  return (
    <div
      className={TitleColumn.className}
      data-wrapped={isWrapped ? 'true' : 'false'}
    >
      <Link
        href={props.event.webLink}
        target='_blank'
        title={props.event.title}
      >
        <span ref={titleRef}>{props.event.title}</span>
      </Link>
      {props.event.labels && (
        <div className={styles.labels}>
          {props.event.labels.map((label, index) => (
            <EntityLabel key={index} label={label} />
          ))}
        </div>
      )}
      {props.displayTime && (
        <div className={styles.time}>
          <TimeColumn {...props} />
        </div>
      )}
    </div>
  )
}

TitleColumn.displayName = 'TitleColumn'
TitleColumn.className = styles.titleColumn
