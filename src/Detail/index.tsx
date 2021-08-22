import 'react-confirm-alert/src/react-confirm-alert.css'

import styled from '@emotion/styled'
import { uniq } from 'rambda'
import React, { useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'

import Grid from '../components/Grid'
import CustomizedPieChart from '../CustomizedPieChart'
import { getPollMetaInfoList } from '../getPollMetaInfoList'
import { useLocalStorage } from '../useLocalStorage'
import DraftSection from './DraftSection'
import { getDefaultPollValueInfoList } from './getDefaultPollValueInfoList'
import { getPollValueInfoUpdater } from './getPollValueInfoUpdater'
import { getSelectedValue } from './getSelectedValue'
import PollButton from './PollButton'

const Wrapper = styled(Grid)`
  background-color: #acd0e6;
  padding: 32px;
  grid-row-gap: 32px;
`
const DesktopTitleSection = styled.div``
const VoteSection = styled(Grid)`
  grid-auto-flow: column;
`
const StatisticSection = styled.div``
const ButtonGroupSection = styled(Grid)`
  grid-auto-flow: column;
`
const ButtonGroup = styled(Grid)`
  grid-row-gap: 8px;
  width: 100px;
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

  /** cache calculated result with useMemo to avoid generate different random colors when rerender */
  const isMultiple = useMemo(() => getPollMetaInfoList(pollId), [pollId])
  /** cache calculated result with useMemo to avoid generate different random colors when rerender */
  const pollMetaInfoList = useMemo(() => getPollMetaInfoList(pollId), [pollId])

  /** get statistic value from local storage if it exists */
  const [pollValueInfoList, setPollValueInfoList] = useLocalStorage<PollValueInfo[]>(
    pollId,
    getDefaultPollValueInfoList(pollMetaInfoList)
  )

  const [hasVoted, setHasVoted] = useState(false)
  const [draftSelectedIdList, setDraftSelectedIdList] = useState([])

  const data = pollMetaInfoList.map((pollMetaInfo) => ({
    ...pollMetaInfo,
    value: pollValueInfoList.find((x) => String(x.id) === String(pollMetaInfo.id))?.value ?? 0,
  }))

  const handleClearDraft = () => {
    confirmAlert({
      title: 'Do you want to clear selected value?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setDraftSelectedIdList([])
          },
        },
        {
          label: 'No',
          onClick: () => ({}),
        },
      ],
    })
  }

  const handleSubmit = () => {
    const selectedPollIdList = draftSelectedIdList.map(String)
    const updater = getPollValueInfoUpdater(selectedPollIdList)
    setPollValueInfoList(updater)
    setHasVoted(true)
    setDraftSelectedIdList([])
  }

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

    if (isMultiple) {
      setDraftSelectedIdList((original) => uniq([...original, selected]))
    } else {
      setDraftSelectedIdList([selected])
    }
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
      <DesktopTitleSection></DesktopTitleSection>
      <VoteSection>
        <ButtonGroupSection>
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
          {draftSelectedIdList.length > 0 && (
            <DraftSection
              draftSelectedTitleList={draftSelectedIdList.map((id) =>
                getSelectedValue({ id, pollMetaInfoList })
              )}
              onClear={handleClearDraft}
              onSubmit={handleSubmit}
            />
          )}
        </ButtonGroupSection>
        <Grid justifySelf="flex-end">
          <CustomizedPieChart data={data} totalVoteNumber={totalVoteNumber} />
        </Grid>
      </VoteSection>
      <StatisticSection>Total number of votes recorded: {totalVoteNumber}</StatisticSection>
    </Wrapper>
  )
}

export type { PollValueInfo }

export default Detail
