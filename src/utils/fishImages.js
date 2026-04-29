import fish1 from '../assets/fish1.png'
import fish2 from '../assets/fish2.png'
import fish3 from '../assets/fish3.png'
import fish4 from '../assets/fish4.png'
import fish5 from '../assets/fish5.png'
import fish6 from '../assets/fish6.png'
import fish7 from '../assets/fish7.png'

const FISH_IMAGES = [fish1, fish2, fish3, fish4, fish5, fish6, fish7]

export function getFishImage(id) {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash + id.charCodeAt(i)) % FISH_IMAGES.length
  }
  return FISH_IMAGES[hash]
}
