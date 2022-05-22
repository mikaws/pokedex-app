import { fetchPokemons } from '../../services/fetchPokemons'

const globalRef = global

function setupFetchStub (data: any) {
  return function fetchStub (): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        json: () =>
          Promise.resolve(data)
      })
    })
  }
}

function setupFetchErrorStub (data: any) {
  return function fetchStub (): Promise<any> {
    return new Promise((resolve) => {
      resolve({
        json: () => { throw new Error(data) }
      })
    })
  }
}

describe('fetchPokemons function', () => {
  it('Should return pokemons', async () => {
    const fakeData = { results: [{ name: 'pokemon', url: 'https://pokeapi.test/pokemon' }] }
    globalRef.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

    const res = await fetchPokemons('kanto')

    expect(res).toEqual([{
      name: 'pokemon',
      url: 'https://pokeapi.test/pokemon'
    }])
  })

  it('Should return error', async () => {
    globalRef.fetch = jest.fn().mockImplementation(setupFetchErrorStub('invalid'))

    const res = await fetchPokemons('kanto').catch(err => err.message)

    expect(res).toBe("Couldn't fetch data")
  })
})
