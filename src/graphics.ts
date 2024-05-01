import { vec2 } from 'gl-matrix'

const a = vec2.fromValues(-1.0, 0)
const b = vec2.fromValues(1.0, 0)
const current = vec2.create()

let phase = 0

export const getValue = () => {
  vec2.lerp(current, a, b, Math.sin(phase) * 0.5 + 0.5)
  phase += 0.01
  return [current[0], 0]
}
