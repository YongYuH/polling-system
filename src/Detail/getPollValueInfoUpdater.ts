import type { PollValueInfo } from './index'

type GetPollValueInfoUpdater = (
  selectedPollIdList: (string | number)[]
) => (original: PollValueInfo[]) => PollValueInfo[]

const getPollValueInfoUpdater: GetPollValueInfoUpdater = (selectedPollIdList) => (original) => {
  const updatedResult = selectedPollIdList.reduce((acc, cur) => {
    const selectedPollId = cur
    const stringifyId = String(selectedPollId)
    const originalPollInfoIndex = acc.findIndex((x) => String(x.id) === stringifyId)
    const originalPollInfo = acc[originalPollInfoIndex]
    const originalValue = originalPollInfo?.value ?? 0
    const updatedPollInfo: PollValueInfo = {
      ...originalPollInfo,
      value: originalValue + 1,
    }
    const tempResult = [
      ...acc.slice(0, originalPollInfoIndex),
      updatedPollInfo,
      ...acc.slice(originalPollInfoIndex + 1),
    ]
    return tempResult
  }, original)
  return updatedResult
}

export { getPollValueInfoUpdater }
