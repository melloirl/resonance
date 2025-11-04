import { characters, getSlugForCharacter } from './characters'

export default {
  paths() {
    return characters.map((character) => ({
      params: {
        name: getSlugForCharacter(character),
      },
    }))
  },
}
