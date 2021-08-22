import type { PollMetaInfo } from '../getPollMetaInfoList'
import type { PollValueInfo } from './index'

type GetDefaultPollValueInfo = (pollMetaInfoList: PollMetaInfo[]) => PollValueInfo[]

const getDefaultPollValueInfoList: GetDefaultPollValueInfo = (pollMetaInfoList) => {
  const result = pollMetaInfoList.reduce((acc, cur) => {
    return [...acc, { id: cur.id, title: cur.title, value: 0 }]
  }, [] as PollValueInfo[])
  return result
}

export { getDefaultPollValueInfoList }
