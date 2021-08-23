import styled from '@emotion/styled'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import CustomizedLabel from './CustomizedLabel'
import { getCustomizedLabelInfo } from './getCustomizedLabelInfo'

type Label = React.ComponentProps<typeof PieChart>['label']
type LabelStyle = React.ComponentProps<typeof PieChart>['labelStyle']

const customizedLabelInfo = getCustomizedLabelInfo()

const labelStyle: LabelStyle = {
  fontFamily: 'serif',
  fontSize: '30px',
  fontWeight: 'bold',
}

const label: Label = (labelRenderProps) => {
  const { dataEntry } = labelRenderProps

  /** customized the style of the label in the center of pie chart */
  if (dataEntry.title === customizedLabelInfo.data.title) {
    return <CustomizedLabel key={customizedLabelInfo.key} fontSize={labelStyle.fontSize} />
  }

  return undefined
}

const Wrapper = styled.div`
  width: 50px;
`

const PieChartIcon = () => {
  const pieChartData = [
    {
      color: '#6aabc8',
      value: 50,
    },
    {
      color: '#e95500',
      value: 50,
    },
    /** append customized data to show the label in the center of pie chart */
    customizedLabelInfo.data,
  ]

  return (
    <Wrapper>
      <PieChart
        data={pieChartData}
        label={label}
        labelStyle={labelStyle}
        lineWidth={60}
        segmentsShift={1}
        startAngle={60}
      />
    </Wrapper>
  )
}

export default PieChartIcon
