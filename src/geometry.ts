import { vec2 } from 'gl-matrix'

const plane = [
  [-0.49, 0.25, 0],
  [-0.49, -0.25, 0],
  [0.49, -0.25, 0],
  [0.49, 0.25, 0],
]

export const getVectors = (): vec2[] => {
  return plane.map(([x, y]) => vec2.fromValues(x, y))
}
