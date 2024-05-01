import { getValue } from './signal.ts'

class AudioGenerator extends AudioWorkletProcessor {
  constructor() {
    super()
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0][0].length; i++) {
      const [x, y] = getValue()
      outputs[0][0][i] = x
      outputs[0][1][i] = y
    }

    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
