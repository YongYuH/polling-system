import pollsJson from '../polls.json'

const polls = pollsJson.polls

type GetIsMultiple = (pollId: string) => boolean

const getIsMultiple: GetIsMultiple = (pollId) => {
  const poll = polls.find((x) => String(x.id) === pollId)

  if (!poll) {
    return undefined
  }

  return poll.answer.type === 'Multi'
}

export { getIsMultiple }
