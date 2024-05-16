import { vec2 } from 'gl-matrix'

export const vectors = [
  [-0.49, 0.25],
  [-0.49, -0.25],
  [0.49, -0.25],
  [0.49, 0.25],
].map(([x, y]) => vec2.fromValues(x, y))

const step = 0.8

let index = 0
let magnitude = 0
let a = vec2.create()
let b = vec2.create()
const direction = vec2.create()
const normalized = vec2.create()
const current = vec2.create()
const increment = vec2.create()

// Mutates the vectors
const setInterpolationVectors = (a: vec2, b: vec2) => {
  vec2.subtract(direction, b, a)
  vec2.normalize(normalized, direction)
  vec2.scale(increment, normalized, step)
}

export const getValue = (reset = false) => {
  if (reset) {
    index = 0
    magnitude = 0
    a = vectors[0]
    b = vectors[1]
    setInterpolationVectors(a, b)
    vec2.copy(current, a)
  }

  while (magnitude >= vec2.length(direction)) {
    index = (index + 1) % vectors.length
    magnitude -= vec2.length(direction)
    a = vectors[index]
    b = vectors[(index + 1) % vectors.length]
    setInterpolationVectors(a, b)
    vec2.scaleAndAdd(current, a, normalized, magnitude)
  }

  const [x, y] = current
  vec2.add(current, current, increment)
  magnitude += step
  return [x, y]
}
