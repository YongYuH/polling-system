import styled from '@emotion/styled'
import randomColor from 'randomColor'
import React from 'react'

import CustomizedPieChart from './CustomizedPieChart'
import pollsJson from './polls.json'

const polls = pollsJson.polls

const data = polls[0].answer.options.map((option) => ({
  key: option.id,
  title: option.label,
  /** generate random dark background color to improve the text legibility of white label */
  color: randomColor({
    luminosity: 'dark',
  }),
  value: 10,
}))

const Wrapper = styled.div`
  background-color: #dbdbdb;
`

const App = () => {
  return (
    <Wrapper>
      <CustomizedPieChart data={data} />
    </Wrapper>
  )
}

export default App
