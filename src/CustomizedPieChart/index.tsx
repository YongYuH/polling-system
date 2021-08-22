import styled from '@emotion/styled'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

type Data = React.ComponentProps<typeof PieChart>['data']
type Label = React.ComponentProps<typeof PieChart>['label']
type LabelStyle = React.ComponentProps<typeof PieChart>['labelStyle']

const label: Label = (labelRenderProps) => {
  const { dataEntry } = labelRenderProps

  const roundedPercentage = Math.round(dataEntry.percentage)
  return roundedPercentage
}

const labelStyle: LabelStyle = {
  fill: 'white',
  fontFamily: 'serif',
  fontSize: '14px',
  fontWeight: 'bold',
}

const Wrapper = styled.div`
  padding: 16px;
  width: 200px;
`

interface CustomizedPieChartProps {
  data: Data
}

const CustomizedPieChart = (props: CustomizedPieChartProps) => {
  const { data } = props

  return (
    <Wrapper>
      <PieChart
        data={data}
        label={label}
        labelPosition={70}
        labelStyle={labelStyle}
        lineWidth={60}
        startAngle={-90}
      />
    </Wrapper>
  )
}

export default CustomizedPieChart
