var Readable = require('stream').Readable
var Writable = require('stream').Writable

class ArrayStreamer extends Readable {
  constructor(array, options) {
    super(options)
    this.source = array
    this.index = 0
  }

  _read(size) {
    if (this.index == this.source.length) return this.push(null)
      
    this.push((this.source[this.index++]).toString()) 
  }

}

var arrayStream = new ArrayStreamer([2, 5, 10, 12])
//arrayStream.pipe(process.stdout)

class ArrayStreamWriter extends Writable {
  constructor(options) {
    super(options)
    this.sink = []
  }

  _write(chunk, encoding, callback) {
    this.sink.push(chunk)
    callback()
  }
}

var arrayWriter = new ArrayStreamWriter()
arrayStream.pipe(arrayWriter)

console.log(arrayWriter.sink)
