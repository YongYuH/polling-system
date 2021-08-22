import styled from '@emotion/styled'
import React from 'react'

import Detail from './Detail'

const Wrapper = styled.div`
  background-color: #dbdbdb;
`

const App = () => {
  return (
    <Wrapper>
      <Detail pollId="4" />
    </Wrapper>
  )
}

export default App
