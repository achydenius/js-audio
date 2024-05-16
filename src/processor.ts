import { getValue } from './signal.ts'
import { getVectors } from './geometry.ts'

class AudioGenerator extends AudioWorkletProcessor {
  private init = false

  constructor() {
    super()
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0][0].length; i++) {
      const [x, y] = getValue(!this.init ? getVectors() : undefined)
      outputs[0][0][i] = x
      outputs[0][1][i] = y
    }

    this.init = true

    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
