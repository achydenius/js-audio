import P5 from 'p5'
import { playSound } from './audio'

const points = [
  [400, 100],
  [700, 300],
  [500, 700],
  [250, 600],
  [150, 200],
]

const step = 146.5

const drawVectors = (vectors: P5.Vector[], p5: P5) => {
  p5.stroke('gray')
  p5.strokeWeight(1)
  for (let i = 0; i < vectors.length; i++) {
    const a = vectors[i]
    const b = vectors[(i + 1) % vectors.length]
    p5.line(a.x, a.y, b.x, b.y)
  }
}

const sketch = (p5: P5) => {
  const vectors = points.map(([x, y]) => p5.createVector(x, y))

  p5.setup = () => {
    p5.createCanvas(800, 800)
  }

  let phase = 0
  p5.draw = () => {
    p5.background(220)

    drawVectors(vectors, p5)

    p5.stroke('black')
    p5.strokeWeight(5)

    let magnitude = phase % step
    for (let i = 0; i < vectors.length; i++) {
      const a = vectors[i]
      const b = vectors[(i + 1) % vectors.length]

      const direction = P5.Vector.sub(b, a)
      const normalized = P5.Vector.normalize(direction)
      const increment = P5.Vector.mult(normalized, step)
      const vector = a
        .copy()
        .add(P5.Vector.mult(normalized, magnitude) as unknown as P5.Vector)

      while (magnitude < direction.mag()) {
        p5.point(vector.x, vector.y)
        vector.add(increment as unknown as P5.Vector)
        magnitude += step
      }

      magnitude -= direction.mag()
    }
    phase += 1
  }
}

new P5(sketch)

document.getElementById('play')?.addEventListener('click', () => {
  playSound()
})
