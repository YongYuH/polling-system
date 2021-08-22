import styled from '@emotion/styled'
import React, { ButtonHTMLAttributes } from 'react'

import Grid from '../components/Grid'

const Wrapper = styled(Grid)`
  margin: 32px;
`
interface DraftSectionProps {
  draftSelectedTitleList: string[]
  onClear: ButtonHTMLAttributes<unknown>['onClick']
  onSubmit: ButtonHTMLAttributes<unknown>['onClick']
}

const DraftSection = (props: DraftSectionProps) => {
  const { draftSelectedTitleList, onClear, onSubmit } = props

  return (
    <Wrapper gridRowGap="8px" alignItems="center">
      <div>You have selected: {draftSelectedTitleList.join(', ')}</div>
      <Grid gridAutoFlow="column">
        <div>Do you want to submit the selected answers?</div>
        <button onClick={onSubmit}>submit</button>
      </Grid>
      <Grid gridAutoFlow="column">
        <div>Do you want to clear selected value?</div>
        <button onClick={onClear}>clear</button>
      </Grid>
    </Wrapper>
  )
}

export default DraftSection
