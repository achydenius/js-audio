import { vec2 } from 'gl-matrix'

export class Renderer {
  private readonly step: number

  private index = 0
  private magnitude = 0
  private vectors: vec2[] = []
  private a = vec2.create()
  private b = vec2.create()
  private direction = vec2.create()
  private normalized = vec2.create()
  private current = vec2.create()
  private increment = vec2.create()

  private updated = false

  constructor(step: number) {
    this.step = step
  }

  getVectors() {
    return this.vectors
  }

  setVectors(vectors: vec2[]) {
    this.vectors = vectors
    this.updated = true
  }

  getValue(): vec2 | undefined {
    if (this.vectors.length < 2) {
      return undefined
    }

    if (this.updated) {
      this.index = 0
      this.magnitude = 0
      this.a = this.vectors[0]
      this.b = this.vectors[1]
      this.setInterpolationVectors(this.a, this.b)
      vec2.copy(this.current, this.a)
      this.updated = false
    }

    while (this.magnitude >= vec2.length(this.direction)) {
      this.index = (this.index + 1) % this.vectors.length
      this.magnitude -= vec2.length(this.direction)
      this.a = this.vectors[this.index]
      this.b = this.vectors[(this.index + 1) % this.vectors.length]
      this.setInterpolationVectors(this.a, this.b)
      vec2.scaleAndAdd(this.current, this.a, this.normalized, this.magnitude)
    }

    const [x, y] = this.current
    vec2.add(this.current, this.current, this.increment)
    this.magnitude += this.step
    return [x, y]
  }

  private setInterpolationVectors(a: vec2, b: vec2) {
    vec2.subtract(this.direction, b, a)
    vec2.normalize(this.normalized, this.direction)
    vec2.scale(this.increment, this.normalized, this.step)
  }
}
