import 'react-confirm-alert/src/react-confirm-alert.css'

import styled from '@emotion/styled'
import { format } from 'date-fns'
import { uniq } from 'rambda'
import randomColor from 'randomColor'
import React, { useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'

import Grid from '../components/Grid'
import CustomizedPieChart from '../CustomizedPieChart'
import { useLocalStorage } from '../useLocalStorage'
import DraftSection from './DraftSection'
import { getDefaultPollValueInfoList } from './getDefaultPollValueInfoList'
import { getPoll } from './getPoll'
import { getPollValueInfoUpdater } from './getPollValueInfoUpdater'
import { getSelectedValue } from './getSelectedValue'
import PollButton from './PollButton'

const DesktopHeadSection = styled.div``
const DesktopTitleSection = styled.div`
  border-bottom: 1px dashed #eaeaea;
  font-size: 24px;
  padding: 8px;
`
const DesktopPublishDateSection = styled(Grid)`
  padding: 8px;
`
const BackgroundWrapper = styled(Grid)`
  background-color: #acd0e6;
  padding: 32px;
  grid-row-gap: 32px;
`
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

interface PollMetaInfo {
  key: string
  id: number
  color: string
  title: string
}

interface DetailProps {
  pollId: string
}

const Detail = (props: DetailProps) => {
  const { pollId } = props

  /** cache calculated result with useMemo to avoid generate different random colors when rerender */
  const poll = useMemo(() => getPoll(pollId), [pollId])
  const isMultiple = poll.answer.type === 'Multi'
  const pollMetaInfoList = poll.answer.options.map((option) => ({
    key: `${option.label}-${option.id}`,
    title: option.label,
    /** generate random dark background color to improve the text legibility of white label */
    color: randomColor({
      luminosity: 'dark',
    }),
    id: option.id,
  }))

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
    <>
      <DesktopHeadSection>
        <DesktopTitleSection>{poll.title}</DesktopTitleSection>
        <DesktopPublishDateSection justifyItems="flex-end">
          PUBLISHED: {format(poll.publishedDate, 'EEEE, dd LLLL, yyyy, h:mmaaa')}
        </DesktopPublishDateSection>
      </DesktopHeadSection>
      <BackgroundWrapper>
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
      </BackgroundWrapper>
    </>
  )
}

export type { PollMetaInfo, PollValueInfo }

export default Detail
