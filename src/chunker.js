const Transform = require('stream').Transform;

// A simple readable stream that will output chunks of the desired size
class Chunker extends Transform {
  constructor(size = 1) {
    super({ objectMode: true });
    this.size = size;
    this.currentChunk = [];
  }

  _transform(line, encoding, callback) {
    this.currentChunk.push(line);

    if (this.currentChunk.length === this.size) {
      this.push(this.currentChunk);
      this.currentChunk = [];
    }

    callback();
  }

  _flush(callback) {
    this.push(this.currentChunk);
    this.currentChunk = [];
    callback();
  }
}

module.exports = Chunker;
