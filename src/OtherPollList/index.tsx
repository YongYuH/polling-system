import styled from '@emotion/styled'
import React from 'react'

import Grid from '../components/Grid'
import pollsJson from '../polls.json'
import Card from './Card'

const polls = pollsJson.polls

const Wrapper = styled(Grid)`
  margin: 16px 0;

  @media (min-width: 768px) {
    grid-row-gap: 8px;
  }

  & > * {
    border-right: 1px solid rgba(0, 0, 0, 0.25);
  }

  & > *:nth-of-type(even) {
    border-right: 1px solid transparent;
  }
`

interface OtherPollListProps {
  handleSelectedPollIdChange: (updatedPollId: string) => void
  selectedPollId: string
}

const OtherPollList = (props: OtherPollListProps) => {
  const { handleSelectedPollIdChange, selectedPollId } = props

  const otherPolls = polls.filter((poll) => String(poll.id) !== selectedPollId)

  const getPollClickHandler = (pollId: number) => () => {
    handleSelectedPollIdChange(String(pollId))
  }

  return (
    <Wrapper gridTemplateColumns="1fr 1fr">
      {otherPolls.map((poll) => {
        return (
          <Card
            key={`otherPolls-${poll.id}`}
            onClick={getPollClickHandler(poll.id)}
            publishedDate={poll.publishedDate}
            title={poll.title}
          />
        )
      })}
    </Wrapper>
  )
}

export type { OtherPollListProps }

export default OtherPollList
