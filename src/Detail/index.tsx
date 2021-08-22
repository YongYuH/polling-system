import 'react-confirm-alert/src/react-confirm-alert.css'

import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { Radio, RadioGroup } from 'react-radio-group'

import CustomizedPieChart from '../CustomizedPieChart'
import { getPollMetaInfoList } from '../getPollMetaInfoList'
import { useLocalStorage } from '../useLocalStorage'
import { getDefaultPollValueInfoList } from './getDefaultPollValueInfoList'
import { getPollValueInfoUpdater } from './getPollValueInfoUpdater'

const Wrapper = styled.div`
  background-color: #dbdbdb;
`

const StatisticSection = styled.div`
  background-color: #dbdbdb;
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
    value: pollValueInfoList.find((x) => String(x.id) === String(pollMetaInfo.id))?.value ?? 1,
  }))

  const handleRadioGroupChange = (selected) => {
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
      label: x.title,
      value: x.id,
    }
  })

  const totalVoteNumber = Object.keys(pollValueInfoList).reduce((acc, cur) => {
    return acc + pollValueInfoList[cur].value
  }, 0)

  return (
    <Wrapper>
      <RadioGroup selectedValue={selectedValue} onChange={handleRadioGroupChange}>
        {radioInfoList.map((radioInfo) => (
          <label key={`radio-${radioInfo.label}`}>
            <Radio value={radioInfo.value} />
            {radioInfo.label}
          </label>
        ))}
      </RadioGroup>
      <CustomizedPieChart data={data} />
      <StatisticSection>Total number of votes recorded: {totalVoteNumber}</StatisticSection>
    </Wrapper>
  )
}

export type { PollValueInfo }

export default Detail
