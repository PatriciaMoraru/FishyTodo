import fish1 from '../assets/fish1.png'
import fish2 from '../assets/fish2.png'
import fish4 from '../assets/fish4.png'
import fish5 from '../assets/fish5.png'
import fish6 from '../assets/fish6.png'

export const fishByPriority = {
  tiny:   fish1,
  small:  fish2,
  medium: fish5,
  big:    fish4,
  whale:  fish6,
}

export const speedByPriority = {
  tiny:   0.8,
  small:  1.3,
  medium: 2,
  big:    2.6,
  whale:  3.2,
}

export function getFishImage(priority) {
  return fishByPriority[priority] ?? fishByPriority.medium
}

export function getFishSpeed(priority) {
  return speedByPriority[priority] ?? speedByPriority.medium
}
