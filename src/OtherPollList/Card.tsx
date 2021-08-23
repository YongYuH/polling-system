import styled from '@emotion/styled'
import { format } from 'date-fns'
import React, { DOMAttributes } from 'react'

import Grid from '../components/Grid'
import PieChartIcon from './PieChartIcon'

const Wrapper = styled.div`
  cursor: pointer;
  padding: 0 8px;

  &:nth-last-child(1) > *,
  &:nth-last-child(2) > * {
    border-bottom: 1px solid transparent;
  }
`
const BorderSection = styled(Grid)`
  padding: 8px 0 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  width: calc(100% - 8px);
`
const Date = styled.div`
  color: #196b95;
  font-size: 11px;
  font-weight: bold;
`

interface CardProps {
  onClick: DOMAttributes<HTMLDivElement>['onClick']
  publishedDate: number
  title: string
}

const Card = (props: CardProps) => {
  const { onClick, publishedDate, title } = props
  return (
    <Wrapper onClick={onClick}>
      <BorderSection gridAutoFlow="column" gridColumnGap="8px" gridTemplateColumns="max-content">
        <PieChartIcon />
        <Grid gridTemplateRows="max-content">
          <Date>{format(publishedDate, 'dd MMM yyyy').toUpperCase()}</Date>
          <div>{title}</div>
        </Grid>
      </BorderSection>
    </Wrapper>
  )
}

export default Card
