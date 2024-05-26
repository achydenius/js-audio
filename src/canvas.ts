import P5 from 'p5'
import { vec2 } from 'gl-matrix'
import { Renderer } from './renderer.ts'

const renderer = new Renderer(0.8)

export const createCanvas = (fps: number) => {
  new P5(createSketch(600, 600, fps))

  return (vec: vec2[]) => {
    renderer.setVectors(vec)
  }
}

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

const createSketch =
  (width: number, height: number, fps: number) => (p5: P5) => {
    let init = false

    p5.setup = () => {
      p5.createCanvas(width, height)
    }

    p5.draw = () => {
      if (!init) {
        p5.frameRate(fps)
        init = true
      }
      p5.background(220)
      drawVectors(renderer.getVectors(), p5)

      p5.stroke('black')
      p5.strokeWeight(5)

      const value = renderer.getValue()
      if (value) {
        const [x, y] = value
        p5.point(p5.map(x, -1, 1, 0, width), p5.map(-y, -1, 1, 0, height))
      }
    }
  }
