import { vec2 } from 'gl-matrix'

export const vectors = [
  [-0.49, 0.25],
  [-0.49, -0.25],
  [0.49, -0.25],
  [0.49, 0.25],
].map(([x, y]) => vec2.fromValues(x, y))

const step = 1.0

let index = 0
let magnitude = 0
let [a, b] = vectors
let direction = vec2.subtract(vec2.create(), b, a)
let normalized = vec2.normalize(vec2.create(), direction)
let current = vec2.copy(vec2.create(), a)
let increment = vec2.scale(vec2.create(), normalized, step)

export const getValue = () => {
  while (magnitude >= vec2.length(direction)) {
    index++
    magnitude -= vec2.length(direction)
    a = vectors[index % vectors.length]
    b = vectors[(index + 1) % vectors.length]
    vec2.subtract(direction, b, a)
    vec2.normalize(normalized, direction)
    vec2.scale(increment, normalized, step)
    vec2.scaleAndAdd(current, a, normalized, magnitude)
  }

  if (index < vectors.length) {
    const [x, y] = current
    vec2.add(current, current, increment)
    magnitude += step
    return [x, y]
  }
}
