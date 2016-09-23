var Readable = require('stream').Readable

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
arrayStream.pipe(process.stdout)
