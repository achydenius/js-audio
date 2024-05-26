import { vec2 } from 'gl-matrix'
import { createCanvas } from './canvas.ts'
import { createPlayer } from './audio.ts'

const plane = [
  [-0.49, 0.25, 0],
  [-0.49, -0.25, 0],
  [0.49, -0.25, 0],
  [0.49, 0.25, 0],
].map(([x, y]) => vec2.fromValues(x, y))

document.getElementById('play')?.addEventListener('click', async () => {
  const player = await createPlayer()
  if (player) {
    player(plane)
  }
})

document.getElementById('canvas')?.addEventListener('click', () => {
  const canvas = createCanvas(10)
  canvas(plane)
})
