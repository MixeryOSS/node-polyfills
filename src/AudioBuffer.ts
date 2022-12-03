export class PolyfillAudioBuffer implements AudioBuffer {
    public readonly duration: number;
    public readonly length: number;
    public readonly numberOfChannels: number;
    public readonly sampleRate: number;
    private _channels: Float32Array[];

    public constructor(options: AudioBufferOptions) {
        this.duration = options.length / options.sampleRate;
        this.length = options.length;
        this.numberOfChannels = options.numberOfChannels;
        this.sampleRate = options.sampleRate;

        this._channels = new Array(options.numberOfChannels);
        for (let i = 0; i < options.numberOfChannels; i++) {
            this._channels[i] = new Float32Array(options.length);
        }
    }

    public copyFromChannel(destination: Float32Array, channelNumber: number, bufferOffset?: number): void {
        destination.set(this._channels[channelNumber], bufferOffset ?? 0);
    }

    public copyToChannel(source: Float32Array, channelNumber: number, bufferOffset?: number): void {
        this._channels[channelNumber].set(source.subarray(bufferOffset ?? 0));
    }

    public getChannelData(channel: number): Float32Array {
        let o = new Float32Array(this.length);
        o.set(this._channels[channel]);
        return o;
    }
}
