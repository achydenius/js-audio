const frequency = 440

class AudioGenerator extends AudioWorkletProcessor {
  private index = 0
  private phase = 0

  constructor() {
    super()
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    const amplitude = Math.sin(this.phase) * 0.5 + 0.5
    for (let i = 0; i < outputs[0][0].length; i++) {
      outputs[0][0][i] =
        Math.sin((frequency * 2 * Math.PI * this.index) / sampleRate) *
        amplitude
      outputs[0][1][i] =
        Math.cos((frequency * 2 * Math.PI * this.index) / sampleRate) *
        amplitude
      this.index++
    }
    this.phase += 0.01

    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
