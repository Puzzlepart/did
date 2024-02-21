import get from 'get-value'
import color from 'randomcolor'
import React, { useMemo } from 'react'
import { Cell } from 'recharts'
import { IPieChartContainerProps } from './types'

export function useMemoizedCells(props: IPieChartContainerProps) {
  return useMemo(
    () =>
      props.entries.map((entry, index) => (
        <Cell
          key={index}
          style={{ outline: 'none' }}
          fill={
            entry.fill ??
            color({
              seed: get(entry.data, props.chart.textKey),
              luminosity: props.chart.luminosity
            })
          }
        />
      )),
    [props.entries.length]
  )
}
