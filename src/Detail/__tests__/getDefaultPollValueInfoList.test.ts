import { getDefaultPollValueInfoList } from '../getDefaultPollValueInfoList'

describe('getDefaultPollValueInfoList', () => {
  it('polls with 2 options', () => {
    const pollMetaInfoList = [
      { key: 'Yes-1', title: 'Yes', color: '#d89000', id: 1 },
      { key: 'No-1', title: 'No', color: '#6d0d96', id: 2 },
    ]

    const expected = [
      { id: 1, title: 'Yes', value: 0 },
      { id: 2, title: 'No', value: 0 },
    ]

    const result = getDefaultPollValueInfoList(pollMetaInfoList)

    expect(result).toEqual(expected)
  })
})
