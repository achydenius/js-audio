import P5 from 'p5'
import { getValue } from './signal.ts'
import { vec2 } from 'gl-matrix'
import { getVectors } from './geometry.ts'

const drawVectors = (vectors: vec2[], p5: P5) => {
  p5.stroke('grey')
  p5.strokeWeight(1)
  for (let i = 0; i < vectors.length; i++) {
    const a = vectors[i]
    const b = vectors[(i + 1) % vectors.length]
    p5.line(
      p5.map(a[0], -1, 1, 0, p5.width),
      p5.map(-a[1], -1, 1, 0, p5.height),
      p5.map(b[0], -1, 1, 0, p5.width),
      p5.map(-b[1], -1, 1, 0, p5.height),
    )
  }
}

const createSketch = (width: number, height: number) => (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(width, height)
  }

  let init = false

  p5.draw = () => {
    if (!init) {
      p5.background(220)
      drawVectors(getVectors(), p5)

      p5.frameRate(1)
    }

    p5.stroke('black')
    p5.strokeWeight(5)

    const [x, y] = getValue(!init ? getVectors() : undefined)
    p5.point(p5.map(x, -1, 1, 0, width), p5.map(-y, -1, 1, 0, height))

    init = true
  }
}

export const createCanvas = () => new P5(createSketch(600, 600))
