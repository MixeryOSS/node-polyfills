// Avoid @types/node by reinventing the wheel
interface NodeBufferStatic {
    from(data: any, encoding?: string): Uint8Array;
    concat(buffers: Uint8Array[]): Uint8Array;
}

export class PolyfillBlob implements Blob {
    public readonly type: string;
    public get size(): number { return this._data.length; }
    private _data: Uint8Array;

    public constructor(parts: BlobPart[], options?: BlobPropertyBag) {
        this.type = options?.type ?? "";
        let converted: Uint8Array[] = [];
        let size: number = 0;
        const Buffer = <NodeBufferStatic> globalThis.Buffer;

        parts.forEach((p => {
            if (typeof p == "string") converted.push(Buffer.from(p, "utf-8"));
            else if (p instanceof PolyfillBlob) converted.push(p._data);
            else if (p instanceof Uint8Array) converted.push(p);
            else if (p instanceof ArrayBuffer) converted.push(new Uint8Array(p));
            else if ("buffer" in p) converted.push(new Uint8Array(p.buffer));
            size += converted[converted.length - 1].length;
        }));

        this._data = new Uint8Array(size);
        let pos = 0;
        converted.forEach(v => {
            this._data.set(v, pos);
            pos += v.length;
        });
    }

    public slice(start?: number, end?: number, contentType?: string): Blob {
        return new PolyfillBlob([this._data.slice(start, end)], {
            type: contentType ?? this.type
        });
    }

    public async arrayBuffer(): Promise<ArrayBuffer> {
        return this._data.buffer.slice(0);
    }

    public stream(): ReadableStream<Uint8Array> {
        throw new Error("Not yet implemented.");
    }

    public async text(): Promise<string> {
        const Buffer = <NodeBufferStatic> globalThis.Buffer;
        return (<(encoding: "utf-8") => string> Buffer.from(this._data).toString)("utf-8");
    }
}
