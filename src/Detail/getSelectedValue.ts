import type { PollMetaInfo } from './index'

interface GetSelectedValueArgs {
  id: string | number
  pollMetaInfoList: PollMetaInfo[]
}

type GetSelectedValue = (args: GetSelectedValueArgs) => string

const getSelectedValue: GetSelectedValue = (args) => {
  const { id, pollMetaInfoList } = args

  const selectedAnswerOptionInfo = pollMetaInfoList.find((x) => String(x.id) === String(id))
  if (!selectedAnswerOptionInfo) {
    return undefined
  }

  const selectedValue = selectedAnswerOptionInfo.title
  return selectedValue
}

export { getSelectedValue }
