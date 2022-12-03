import { PolyfillAudioBuffer } from "./AudioBuffer.js";
import { PolyfillBlob } from "./Blob.js";

export const Blob = globalThis.Blob ?? (PolyfillBlob as typeof globalThis.Blob);
export const AudioBuffer = globalThis.AudioBuffer ?? (PolyfillAudioBuffer as typeof globalThis.AudioBuffer);
