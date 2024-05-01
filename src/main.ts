import { playSound } from './audio'
import { createCanvas } from './canvas.ts'

document.getElementById('play')?.addEventListener('click', () => {
  playSound()
})

document.getElementById('canvas')?.addEventListener('click', () => {
  createCanvas()
})
