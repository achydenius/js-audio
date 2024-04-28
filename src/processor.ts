const frequency = 440

class AudioGenerator extends AudioWorkletProcessor {
  private index = 0

  constructor() {
    super()
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    outputs.forEach((output) => {
      output.forEach((channel) => {
        for (let i = 0; i < channel.length; i++) {
          channel[i] = Math.sin(
            (frequency * 2 * Math.PI * this.index) / sampleRate,
          )
          this.index++
        }
      })
    })
    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
