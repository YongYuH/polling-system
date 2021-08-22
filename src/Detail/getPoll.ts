import pollsJson from '../polls.json'

const polls = pollsJson.polls

interface Option {
  id: number
  label: string
}

interface Poll {
  id: number
  title: string
  publishedDate: number
  answer: {
    type: string
    options: Option[]
  }
}

type GetPoll = (pollId: string) => Poll

const getPoll: GetPoll = (pollId) => {
  const poll = polls.find((x) => String(x.id) === String(pollId))

  if (!poll) {
    return undefined
  }

  return poll
}

export type { Poll }

export { getPoll }
