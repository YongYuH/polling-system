import randomColor from 'randomColor'

import pollsJson from './polls.json'

const polls = pollsJson.polls

interface PollMetaInfo {
  color: string
  id: number
  key: string
  title: string
}

type GetPollMetaInfoList = (pollId: string) => PollMetaInfo[]

const getPollMetaInfoList: GetPollMetaInfoList = (pollId) => {
  const poll = polls.find((x) => String(x.id) === pollId)

  if (!poll) {
    return undefined
  }

  return poll.answer.options.map((option) => ({
    key: `${option.label}-${option.id}`,
    title: option.label,
    /** generate random dark background color to improve the text legibility of white label */
    color: randomColor({
      luminosity: 'dark',
    }),
    id: option.id,
  }))
}

export type { PollMetaInfo }

export { getPollMetaInfoList }
