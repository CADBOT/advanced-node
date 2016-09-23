// example custom transform
let Transform = require('stream').Transform

class ConvertEndings extends Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback() 
  }
}

let fs = require('fs')

let input = fs.createReadStream('./labs.txt')
let output = fs.createWriteStream('./labs-out.txt')
input.pipe(new ConvertEndings).pipe(output)
