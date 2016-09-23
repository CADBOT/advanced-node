let Transform = require('stream').Transform
let count = 0

let ConvertEndings = new Transform({
  //highWaterMark: 5,
  transform(chunk, encoding, callback) {
    let lfCount = 0
    for (var b of chunk) { // go through chunk byte by byte
      if (b == 10) {
        lfCount++
      }
    }

    var stagingBuffer = new Buffer(chunk.length + lfCount)
    var offset = 0
    for (var b of chunk) {
      if (b == 10) {
        stagingBuffer.writeUInt8(10, offset++) 
        stagingBuffer.writeUInt8(13, offset++) 
      }
      else {
        stagingBuffer.writeUInt8(b, offset++) 
      }
    }
    this.push(stagingBuffer)
    callback()
  }
})


let fs = require('fs')

let input = fs.createReadStream('./labs.txt')
let output = fs.createWriteStream('./lorem-out.txt')
input.pipe(ConvertEndings).pipe(output)
