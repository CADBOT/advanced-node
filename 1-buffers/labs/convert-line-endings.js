var fs = require('fs')
function convert(inputFile, outputFile) {
  fs.readFile(inputFile, (err, buffer) => {
    let lfCount = 0
    console.log(buffer.length)
    for (var b of buffer) {
      console.log(b)
      if (b == 10) { // a LF
        lfCount++
      }
    }

    // create a new buffer that will be the size of
    // input one, but with extra space for /LF/CR
    var outputBuffer = Buffer.alloc(buffer.length + lfCount)
    console.log(outputBuffer.length)
    let offset = 0
    for (var b of buffer) {
      if (b == 10) { // a LF
        outputBuffer.writeUInt8(10, offset++) // write /LF
        outputBuffer.writeUInt8(13, offset++) // write /CR
      }
      else {
        outputBuffer.writeUInt8(b, offset++)
      }
    }
    fs.writeFile(outputFile, outputBuffer)
  })
}

convert('./somefile.txt', './somefile-windows.txt')
//convert('../../2-streams/labs/lorem-ipsum.txt', './lorem-out.txt')
