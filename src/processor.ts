import { Renderer } from './renderer.ts'

class AudioGenerator extends AudioWorkletProcessor {
  private renderer = new Renderer(0.8)

  constructor() {
    super()

    this.port.onmessage = (event) => {
      this.renderer.setVectors(event.data)
    }
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0][0].length; i++) {
      const value = this.renderer.getValue()
      if (value) {
        const [x, y] = value
        outputs[0][0][i] = x
        outputs[0][1][i] = y
      }
    }

    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
