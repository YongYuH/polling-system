import styled from '@emotion/styled'
import React, { useState } from 'react'

import Detail from './Detail'
import OtherPollList, { OtherPollListProps } from './OtherPollList'

const Wrapper = styled.div``

const App = () => {
  const [selectedPollId, setSelectedPollId] = useState('1')

  const handleSelectedPollIdChange: OtherPollListProps['handleSelectedPollIdChange'] = (
    updatedPollId
  ) => {
    setSelectedPollId(updatedPollId)
  }

  return (
    <Wrapper>
      <Detail pollId={selectedPollId} />
      <OtherPollList
        handleSelectedPollIdChange={handleSelectedPollIdChange}
        selectedPollId={selectedPollId}
      />
    </Wrapper>
  )
}

export default App
