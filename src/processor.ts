import { getValue } from './signal.ts'
import { vec2 } from 'gl-matrix'

class AudioGenerator extends AudioWorkletProcessor {
  private init = false
  private vectors: vec2[] = []

  constructor() {
    super()

    this.port.onmessage = (event) => {
      this.vectors = event.data
    }
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0][0].length; i++) {
      const [x, y] = getValue(!this.init ? this.vectors : undefined)
      outputs[0][0][i] = x
      outputs[0][1][i] = y
    }

    this.init = true

    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
