import 'react-confirm-alert/src/react-confirm-alert.css'

import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'

import Grid from '../components/Grid'
import CustomizedPieChart from '../CustomizedPieChart'
import { getPollMetaInfoList } from '../getPollMetaInfoList'
import { useLocalStorage } from '../useLocalStorage'
import { getDefaultPollValueInfoList } from './getDefaultPollValueInfoList'
import { getPollValueInfoUpdater } from './getPollValueInfoUpdater'
import PollButton from './PollButton'

const Wrapper = styled.div`
  background-color: #dbdbdb;
`

const StatisticSection = styled.div`
  background-color: #dbdbdb;
`

const ButtonGroup = styled(Grid)`
  grid-column-gap: 8px;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, 100px);
`

interface PollValueInfo {
  id: number
  title: string
  value: number
}

interface DetailProps {
  pollId: string
}

const Detail = (props: DetailProps) => {
  const { pollId } = props
  const pollMetaInfoList = useMemo(() => getPollMetaInfoList(pollId), [pollId])
  const [pollValueInfoList, setPollValueInfoList] = useLocalStorage<PollValueInfo[]>(
    pollId,
    getDefaultPollValueInfoList(pollMetaInfoList)
  )
  const [hasVoted, setHasVoted] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const data = pollMetaInfoList.map((pollMetaInfo) => ({
    ...pollMetaInfo,
    value: pollValueInfoList.find((x) => String(x.id) === String(pollMetaInfo.id))?.value ?? 0,
  }))

  const getClickHandler = (selected) => () => {
    if (hasVoted) {
      confirmAlert({
        title: 'You have voted!',
        buttons: [
          {
            label: 'OK',
            onClick: () => ({}),
          },
        ],
      })
      return
    }

    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure to vote for this?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setSelectedValue(selected)
            const selectedPollId = String(selected)
            const updater = getPollValueInfoUpdater(selectedPollId)
            setPollValueInfoList(updater)
          },
        },
        {
          label: 'No',
          onClick: () => ({}),
        },
      ],
    })
    setHasVoted(true)
  }

  const radioInfoList = data.map((x) => {
    return {
      backgroundColor: x.color,
      label: x.title,
      value: x.id,
    }
  })

  const totalVoteNumber = Object.keys(pollValueInfoList).reduce((acc, cur) => {
    return acc + pollValueInfoList[cur].value
  }, 0)

  return (
    <Wrapper>
      <ButtonGroup>
        {radioInfoList.map((radioInfo) => (
          <PollButton
            key={`radio-${radioInfo.label}`}
            backgroundColor={radioInfo.backgroundColor}
            label={radioInfo.label}
            onClick={getClickHandler(radioInfo.value)}
          />
        ))}
      </ButtonGroup>
      <CustomizedPieChart data={data} totalVoteNumber={totalVoteNumber} />
      <StatisticSection>Total number of votes recorded: {totalVoteNumber}</StatisticSection>
    </Wrapper>
  )
}

export type { PollValueInfo }

export default Detail
