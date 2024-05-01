import P5 from 'p5'
import { getValue } from './graphics.ts'

const createSketch = (width: number, height: number) => (p5: P5) => {
  p5.setup = () => {
    p5.createCanvas(width, height)
  }

  p5.draw = () => {
    p5.background(220)

    p5.stroke('black')
    p5.strokeWeight(5)

    const [x, y] = getValue()
    p5.point(p5.map(x, -1, 1, 0, width), p5.map(y, -1, 1, 0, height))
  }
}

export const createCanvas = () => new P5(createSketch(800, 600))
