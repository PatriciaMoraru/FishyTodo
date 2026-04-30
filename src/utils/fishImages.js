import fish1 from '../assets/fish1.png'
import fish5 from '../assets/fish5.png'
import fish6 from '../assets/fish6.png'

export const fishByPriority = {
  low:    fish1,
  medium: fish5,
  high:   fish6,
}

export const speedByPriority = {
  low:    1,
  medium: 2,
  high:   3.5,
}

export function getFishImage(priority) {
  return fishByPriority[priority] ?? fishByPriority.medium
}

export function getFishSpeed(priority) {
  return speedByPriority[priority] ?? speedByPriority.medium
}
