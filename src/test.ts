import { AudioBuffer, Blob } from "./index.js";

let myBlob = new Blob(["Hello world!", " ", "<3"]);
console.log("Blob", myBlob);
console.log("Blob#text", await myBlob.text());
console.log("Blob#arrayBuffer", await myBlob.arrayBuffer());

let myAudio = new AudioBuffer({
    length: 16,
    sampleRate: 48000,
    numberOfChannels: 2
});
myAudio.copyToChannel(new Float32Array([1, 2, 3]), 0);
console.log("AudioBuffer", myAudio);
