import { getPollValueInfoUpdater } from '../getPollValueInfoUpdater'

describe('getPollValueInfoUpdater', () => {
  it('new poll in 6 options', () => {
    const selectedPollIdList = ['11', '9']
    const pollValueInfoListUpdater = getPollValueInfoUpdater(selectedPollIdList)

    const originalState = [
      {
        id: 7,
        title: 'Hong Kong',
        value: 7,
      },
      {
        id: 8,
        title: 'China',
        value: 8,
      },
      {
        id: 9,
        title: 'Australia',
        value: 9,
      },
      {
        id: 10,
        title: 'Thailand',
        value: 10,
      },
      {
        id: 11,
        title: 'Korea',
        value: 11,
      },
      {
        id: 12,
        title: 'Japan',
        value: 12,
      },
    ]

    const expected = [
      {
        id: 7,
        title: 'Hong Kong',
        value: 7,
      },
      {
        id: 8,
        title: 'China',
        value: 8,
      },
      {
        id: 9,
        title: 'Australia',
        value: 10,
      },
      {
        id: 10,
        title: 'Thailand',
        value: 10,
      },
      {
        id: 11,
        title: 'Korea',
        value: 12,
      },
      {
        id: 12,
        title: 'Japan',
        value: 12,
      },
    ]

    const result = pollValueInfoListUpdater(originalState)

    expect(result).toEqual(expected)
  })
})
