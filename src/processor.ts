class AudioGenerator extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(_: Float32Array[][], outputs: Float32Array[][]) {
    outputs.forEach(output => {
      output.forEach(channel => {
        for (let i = 0; i < channel.length; i++) {
          channel[i] = Math.random() * 2 - 1
        }
      });
    })
    return true
  }
}

registerProcessor('audio-generator', AudioGenerator)
