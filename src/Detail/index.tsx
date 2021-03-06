import 'react-confirm-alert/src/react-confirm-alert.css'

import { css, Global } from '@emotion/react'
import styled from '@emotion/styled'
import { format } from 'date-fns'
import { uniq } from 'rambda'
import randomColor from 'randomcolor'
import React, { useEffect, useMemo, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { BsFillChatFill } from 'react-icons/bs'

import Grid from '../components/Grid'
import { useLocalStorage } from '../useLocalStorage'
import CustomizedPieChart from './CustomizedPieChart'
import DraftSection from './DraftSection'
import { getDefaultPollValueInfoList } from './getDefaultPollValueInfoList'
import { getPoll } from './getPoll'
import { getPollValueInfoUpdater } from './getPollValueInfoUpdater'
import { getSelectedValue } from './getSelectedValue'
import PollButton from './PollButton'

const DesktopSection = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`
const MobileSection = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`
const DesktopTitleSection = styled.div`
  border-bottom: 1px dashed #eaeaea;
  font-size: 24px;
  padding: 8px;
`
const DesktopPublishDateSection = styled(Grid)`
  padding: 8px;
`
const BackgroundWrapper = styled(Grid)`
  background-color: #dbdbdb;
  grid-row-gap: 8px;
  padding: 8px;

  @media (min-width: 768px) {
    grid-row-gap: 32px;
    padding: 32px;
  }
`
const DescriptionSection = styled(Grid)`
  grid-row-gap: 8px;
  padding: 0 8px;
`
const TodayTitleWrapper = styled(Grid)`
  grid-auto-flow: column;
  grid-column-gap: 4px;
  grid-template-columns: max-content;
  align-items: center;
`
const Title = styled.div`
  color: #196b95;
  font-weight: bold;
`
const VoteSection = styled(Grid)`
  grid-auto-flow: column;
`
const StatisticSection = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`
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

  /** cache calculated result with useMemo to improve performance */
  const poll = useMemo(() => getPoll(pollId), [pollId])
  const isMultiple = poll.answer.type === 'Multi'
  /** cache calculated result with useMemo to avoid generate different random colors when rerender */
  const pollMetaInfoList = useMemo(
    () =>
      poll.answer.options.map((option) => ({
        key: `${option.label}-${option.id}`,
        title: option.label,
        /** generate random dark background color to improve the text legibility of white label */
        color: randomColor({
          luminosity: 'dark',
        }),
        id: option.id,
      })),
    [poll.id]
  )

  /** get statistic value from local storage if it exists */
  const [pollValueInfoList, setPollValueInfoList] = useLocalStorage<PollValueInfo[]>(
    pollId,
    getDefaultPollValueInfoList(pollMetaInfoList)
  )

  const [hasVoted, setHasVoted] = useState(false)

  /** reset flag of hasVoted when poll id changes */
  useEffect(() => {
    setHasVoted(false)
  }, [pollId])

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
      <Global
        styles={css`
          .react-confirm-alert-body {
            @media (max-width: 767px) {
              width: 250px;
            }
            @media (min-width: 768px) {
              width: 400px;
            }
          }
        `}
      />
      <DesktopSection>
        <DesktopTitleSection>{poll.title}</DesktopTitleSection>
        <DesktopPublishDateSection justifyItems="flex-end">
          PUBLISHED: {format(poll.publishedDate, 'EEEE, dd LLLL, yyyy, h:mmaaa')}
        </DesktopPublishDateSection>
      </DesktopSection>
      <BackgroundWrapper>
        <MobileSection>
          <TodayTitleWrapper>
            <BsFillChatFill color="#006693" />
            <Title>Today&apos;s Poll</Title>
          </TodayTitleWrapper>
        </MobileSection>
        <DescriptionSection>
          <MobileSection>{poll.title}</MobileSection>
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
              <DesktopSection>
                {draftSelectedIdList.length > 0 && (
                  <DraftSection
                    draftSelectedTitleList={draftSelectedIdList.map((id) =>
                      getSelectedValue({ id, pollMetaInfoList })
                    )}
                    onClear={handleClearDraft}
                    onSubmit={handleSubmit}
                  />
                )}
              </DesktopSection>
            </ButtonGroupSection>
            <Grid justifySelf="flex-end">
              <CustomizedPieChart data={data} totalVoteNumber={totalVoteNumber} />
            </Grid>
          </VoteSection>
          <MobileSection>
            {draftSelectedIdList.length > 0 && (
              <DraftSection
                draftSelectedTitleList={draftSelectedIdList.map((id) =>
                  getSelectedValue({ id, pollMetaInfoList })
                )}
                onClear={handleClearDraft}
                onSubmit={handleSubmit}
              />
            )}
          </MobileSection>
        </DescriptionSection>
        <StatisticSection>Total number of votes recorded: {totalVoteNumber}</StatisticSection>
      </BackgroundWrapper>
    </>
  )
}

export type { PollMetaInfo, PollValueInfo }

export default Detail
