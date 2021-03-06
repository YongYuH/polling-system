import styled from '@emotion/styled'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import CustomizedLabel from './CustomizedLabel'
import { getCustomizedLabelInfo } from './getCustomizedLabelInfo'

type Data = React.ComponentProps<typeof PieChart>['data']
type Label = React.ComponentProps<typeof PieChart>['label']
type LabelStyle = React.ComponentProps<typeof PieChart>['labelStyle']

const customizedLabelInfo = getCustomizedLabelInfo()

const labelStyle: LabelStyle = {
  fill: 'white',
  fontFamily: 'serif',
  fontSize: '14px',
  fontWeight: 'bold',
}

const label: Label = (labelRenderProps) => {
  const { dataEntry } = labelRenderProps

  /** customized the style of the label in the center of pie chart */
  if (dataEntry.title === customizedLabelInfo.data.title) {
    return <CustomizedLabel key={customizedLabelInfo.key} fontSize={labelStyle.fontSize} />
  }

  const roundedPercentage = Math.round(dataEntry.percentage)
  return roundedPercentage
}

const Wrapper = styled.div`
  padding: 16px;
  width: 100px;

  @media (min-width: 768px) {
    width: 200px;
  }
`

const PlaceholderWrapper = styled.div`
  padding: 32px 16px;
`

interface CustomizedPieChartProps {
  data: Data
  totalVoteNumber: number
}

const CustomizedPieChart = (props: CustomizedPieChartProps) => {
  const { data, totalVoteNumber } = props

  if (totalVoteNumber === 0) {
    return (
      <PlaceholderWrapper>No one has voted yet. Be the first person to vote!</PlaceholderWrapper>
    )
  }

  const dataWithCustomizedLabel = [
    ...data.filter((x) => x.value !== 0),
    /** append customized data to show the label in the center of pie chart */
    customizedLabelInfo.data,
  ]

  return (
    <Wrapper>
      <PieChart
        data={dataWithCustomizedLabel}
        label={label}
        labelPosition={70}
        labelStyle={labelStyle}
        lengthAngle={-360}
        lineWidth={60}
        startAngle={180}
      />
    </Wrapper>
  )
}

export default CustomizedPieChart
