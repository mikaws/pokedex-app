import { fetchTargetPokemon } from '@services'

const globalRef: any = global

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

describe('fetchTargetPokemon function', () => {
  it('Should return a pokemon', async () => {
    const fakeData = {
      sprites: { front_default: 'pokemon-image' },
      types: [
        { type: { name: 'grass' } },
        { type: { name: 'poison' } }
      ]
    }

    globalRef.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

    const res = await fetchTargetPokemon(1)

    expect(res).toEqual({
      image: 'pokemon-image',
      types: {
        firstType: 'grass',
        secondType: 'poison'
      }
    })
  })

  it('Should return a pokemon without a second type', async () => {
    const fakeData = {
      sprites: { front_default: 'pokemon-image' },
      types: [
        { type: { name: 'water' } }
      ]
    }
    globalRef.fetch = jest.fn().mockImplementation(setupFetchStub(fakeData))

    const res = await fetchTargetPokemon(4)

    expect(res).toEqual({
      image: 'pokemon-image',
      types: {
        firstType: 'water',
        secondType: undefined
      }
    })
  })

  it('Should return error', async () => {
    globalRef.fetch = jest.fn().mockImplementation(setupFetchErrorStub('invalid'))

    const res = await fetchTargetPokemon(1).catch(err => err.message)

    expect(res).toBe("Couldn't fetch data")
  })
})

export {}
