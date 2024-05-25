import { playSound } from './audio'
import { createCanvas } from './canvas.ts'
import { vec2 } from 'gl-matrix'

const plane = [
  [-0.49, 0.25, 0],
  [-0.49, -0.25, 0],
  [0.49, -0.25, 0],
  [0.49, 0.25, 0],
].map(([x, y]) => vec2.fromValues(x, y))

document.getElementById('play')?.addEventListener('click', () => {
  playSound(plane)
})

document.getElementById('canvas')?.addEventListener('click', () => {
  createCanvas(plane)
})
