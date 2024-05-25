// @ts-ignore
import processorUrl from './processor.ts?url'
import { vec2 } from 'gl-matrix'

export const playSound = async (vectors: vec2[]) => {
  try {
    const context = new AudioContext()
    await context.audioWorklet.addModule(processorUrl)

    const workletNode = new AudioWorkletNode(context, 'audio-generator', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    })
    workletNode.connect(context.destination)
    workletNode.port.postMessage(vectors)
  } catch (err) {
    console.error(err)
  }
}
