import { getSelectedValue } from '../getSelectedValue'

describe('getSelectedValue', () => {
  it('polls with 2 options', () => {
    const id = '2'

    const pollMetaInfoList = [
      { key: 'Yes-1', title: 'Yes', color: '#d89000', id: 1 },
      { key: 'No-1', title: 'No', color: '#6d0d96', id: 2 },
    ]

    const expected = 'No'

    const result = getSelectedValue({ id, pollMetaInfoList })

    expect(result).toEqual(expected)
  })
})
