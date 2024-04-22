const sampleRate = 44100;
const hz = 440;
const wavetable = Float32Array.from({ length: sampleRate }, (_, i) => Math.sin(i * Math.PI * 2 / hz));

export const playSound = () => {
  const context = new AudioContext({ sampleRate });

  const buffer = context.createBuffer(1, wavetable.length, sampleRate);
  buffer.copyToChannel(wavetable, 0);

  const source = context.createBufferSource();
  source.connect(context.destination);
  source.buffer = buffer;

  source.start();
}
