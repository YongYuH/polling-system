import type { PollValueInfo } from './index'

type GetPollValueInfoUpdater = (
  selectedPollId: string | number
) => (original: PollValueInfo[]) => PollValueInfo[]

const getPollValueInfoUpdater: GetPollValueInfoUpdater = (selectedPollId) => (original) => {
  const stringifyId = String(selectedPollId)
  const originalPollInfoIndex = original.findIndex((x) => String(x.id) === stringifyId)
  const originalPollInfo = original.find((x) => String(x.id) === stringifyId)
  const originalValue = originalPollInfo?.value ?? 0
  const updatedPollInfo: PollValueInfo = {
    ...originalPollInfo,
    value: originalValue + 1,
  }
  const updatedResult = [
    ...original.slice(0, originalPollInfoIndex),
    updatedPollInfo,
    ...original.slice(originalPollInfoIndex + 1),
  ]
  return updatedResult
}

export { getPollValueInfoUpdater }
