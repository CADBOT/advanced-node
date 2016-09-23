/*
 * We saw that node fs read file uses buffers (show example) but what really are they?
 *
 */

/*
 * Explain how javascript Arrays are really just Object, and what this means to memory
 * 
 * Refresh class on how "true" arrays work
 *
 * Explain how regular javscript only has - unicode - strings. Each char in a string
 * will occupy at least one byte in memory. Often it makes more sense to work with
 * true binary
 *
 *  a => 61(decimal) => 01000001(binary)
 */


/*
 * We can create a new Buffer, passing in the length in
 * bytes (8 bits)
 *
 * equivalent malloc in C
 *
 * A buffer is essentially an UInt8Array
 *
 */
var buff = new Buffer(5) // 5 bytes
buff.write('hello') // will convert this string to byte representation
console.log(buff)
console.log(buff.toString())
// As we are in the ASCII range of UTF-8, each char will be represented with
// a single byte, hence
console.log(buff.toString().length == Buffer.byteLength(buff))
// However, this isn't always the case. Certain UTF chars are represnted
// with more than one byte. For example
buff = new Buffer('❅') // when given a string, it will allocate a buffer large enough for the string, and write it
// this char uses more than one byte, so false
console.log(buff.toString().length === Buffer.byteLength(buff))

/*
 * instead of writing strings and allowing node to translate them to bytes,
 * we can directly write a byte via an 8 bit integer
 */
var buff = new Buffer(2) // 5 bytes
buff.writeUInt8(72)
buff.writeUInt8(73)
console.log(buff)
console.log(buff.toString()) // Oh no! what went wrong. Let's try again

buff.writeInt8(72)
buff.writeInt8(73, 1) // second argument is the offset. Otherwise we are just overwriting the first byte!
console.log(buff)
console.log(buff.toString()) // Correct value :D

/*
 * We can also specify an array of integers (bytes) at creation
 */
b = new Buffer([65, 65, 60])
console.log(b.toString())

// We can use bracket notation to read individual bytes
console.log(buff[0])
console.log(buff[1])
// We can also use bracked notation to write Individual bytes (Much more convienent!)
buff[1] = 90
console.log(buff)
console.log(buff.toString())

// If we go over the length, it will just truncate
b = new Buffer(3)
b.write('hello!')
console.log(b.toString())

// What if we don't write to every byte?
b = new Buffer(10)
b.write('hello!')
console.log(b.toString())
// We git the exra junk! This can be considered a security flaw. Use Buffer.alloc to avoid
// this zeros out the open bits
b = Buffer.alloc(11)
b.write('hello')
console.log(b.toString())
b.write(' world', 5) // write to the open bits of the same buffer
console.log(b.toString())
// new is technically deprecated, but having non zerod out buffers provides a
// performance booste. Here is the advocated way to create such a buffer
b = Buffer.allocUnsafe(10)
console.log(b.toString())

// use Buffer.from() if we want to create a zeroed out buffer, and then specify
// an array of bytes to write, or a string that will be converte to bytes
console.log(Buffer.from('inside from').toString())
console.log(Buffer.from([80, 81, 82]).toString())
console.log(b.toString('base64'))

// Remember this trick from basic Auth?
b = new Buffer('dXNlcm5hbWU6cGFzc3dvcmQ=', 'base64')
console.log(b.toString())

// or with the new syntax
b = Buffer.from('dXNlcm5hbWU6cGFzc3dvcmQ=', 'base64')
console.log(b.toString())

// We can write things other than 8bit ints as well
// for example. let's write a 16bit int
// For example, we can write hi in one go
// h = 48(hex) => 01001000
// i = 49(hex) => 01001001
// if we concatenate the dividual bits(spaces are for read ability)
//
// 01001000 01001001 => 18505 (decimal)
//
//
b = new Buffer(2)
//b.writeUInt16BE(12337)
b.writeUInt16BE(18505)
//b.writeUInt8(72)
//b.writeUInt8(73, 1)
console.log('my buffer BE')
console.log(b)
console.log(b.toString())
console.log(b[0]) // 48 => 
console.log(b[1]) // 49 => 
// if we convert 48 49 to one long binary number, it will ewuql our original input 18505

// LE will flip this and store the least sig Byte  first (in the reverse worder
b.writeUInt16LE(18505)
console.log('my buffer LE')
console.log(b)
console.log(b.toString())
// if we convert it back to binary as is, we will get a different decimal number
// as the bytes are stored backwards
//
// There are also 32bit versions (lab)
//
// We can slice as well this returns a view or ref. not a copy
b = Buffer.from('hello world!')
c = b.slice(6, 11)
console.log(c.toString())
c.write('byeee')
console.log(c.toString())
console.log(b.toString())
c.write('byeeeeee') // will only write to the selection we grab. Rest is truncated
console.log(c.toString())
console.log(b.toString())

// We can also read by a set amount

b = Buffer.from('hello world!')
console.log(b.readUInt8(0)) // 104 (decimal rep of 8)
console.log(b.readUInt8(1)) // 

// or read in multi bytes at once
var c = b.readUInt16BE()
console.log(c) //26725 => 0110100001100101 => (bit for 104 concated with bits for next letter)
