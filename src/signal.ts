import { vec2 } from 'gl-matrix'

const triangle = [
  [0, 1.0],
  [-0.866, -0.5],
  [0.866, -0.5],
]
const vectors = triangle.map(([x, y]) => vec2.fromValues(x, y))

const current = vec2.create()
let phase = 0
let index = 0

export const getValue = () => {
  const a = vectors[index]
  const b = vectors[(index + 1) % vectors.length]

  vec2.lerp(current, a, b, phase)

  phase += 0.01
  if (phase > 1.0) {
    phase -= 1.0
    index = (index + 1) % vectors.length
  }

  return current
}
