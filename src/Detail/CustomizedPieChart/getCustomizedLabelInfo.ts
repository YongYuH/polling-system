import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

type Data = React.ComponentProps<typeof PieChart>['data']

const getCustomizedLabelInfo = () => {
  const data: Data[number] = {
    key: 'customized',
    title: 'customizedLabelTitle',
    color: '#133b6a',
    value: 0,
  }

  const key = `label-${data.key}`

  return {
    data,
    key,
  }
}

export { getCustomizedLabelInfo }
