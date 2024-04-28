// @ts-ignore
import processorUrl from './processor.ts?url'

export const playSound = async () => {
  try {
    const context = new AudioContext()
    await context.audioWorklet.addModule(processorUrl)

    const workletNode = new AudioWorkletNode(context, 'audio-generator', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [2],
    })
    workletNode.connect(context.destination)
  } catch (err) {
    console.error(err)
  }
}
