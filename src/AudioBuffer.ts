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

    public copyFromChannel(destination: Float32Array, channelNumber: number, startInChannel: number = 0): void {
        destination.set(this._channels[channelNumber].subarray(startInChannel, startInChannel + destination.length));
    }

    public copyToChannel(source: Float32Array, channelNumber: number, startInChannel: number = 0): void {
        const copySize = this._channels[channelNumber].length - startInChannel;
        if (copySize <= 0) return;
        this._channels[channelNumber].set(source.subarray(0, copySize), startInChannel);
    }

    public getChannelData(channel: number): Float32Array {
        let o = new Float32Array(this.length);
        o.set(this._channels[channel]);
        return o;
    }
}
