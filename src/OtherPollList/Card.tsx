import styled from '@emotion/styled'
import { format } from 'date-fns'
import React, { DOMAttributes } from 'react'

import Grid from '../components/Grid'
import PieChartIcon from './PieChartIcon'

const Wrapper = styled.div`
  cursor: pointer;
  padding: 0 8px;

  &:nth-last-of-type(1) > *,
  &:nth-last-of-type(2) > * {
    border-bottom: 1px solid transparent;
  }
`
const BorderSection = styled(Grid)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  width: calc(100% - 8px);
  height: 100%;
  align-items: center;
`
const Date = styled.div`
  color: #196b95;
  font-size: 11px;
  font-weight: bold;
`
const Title = styled.div`
  font-size: 12px;
`
const Text = styled.div`
  display: grid;
  grid-template-rows: max-content;
  padding: 8px 0;
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
        <Text>
          <Date>{format(publishedDate, 'dd MMM yyyy').toUpperCase()}</Date>
          <Title>{title}</Title>
        </Text>
      </BorderSection>
    </Wrapper>
  )
}

export default Card
