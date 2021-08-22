import 'jest-extended'

import { getPoll } from '../getPoll'

describe('getPoll', () => {
  it('get correct id and result includes required fields', () => {
    const id = '2'
    const result = getPoll(id)
    expect(result).toContainEntry(['id', 2])
    expect(result).toContainAllKeys(['id', 'title', 'publishedDate', 'answer'])
  })
})
