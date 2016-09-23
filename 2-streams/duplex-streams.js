/*
Duplex and Transform Streams
#
Class: stream.Duplex
#
Added in: v0.9.4

Duplex streams are streams that implement both the Readable and Writable interfaces.

Examples of Duplex streams include:

    TCP sockets
    zlib streams
    crypto streams

Class: stream.Transform
#
Added in: v0.9.4

Transform streams are Duplex streams where the output is in some way related to the input. Like all Duplex streams, Transform streams implement both the Readable and Writable interfaces.

Examples of Transform streams include:

    zlib streams
    crypto streams
*/

/*
 * tcp socket is an example of a vanilla duplex stream. Transforms are special streams
 * where the output is related to the input. For example zlib
 */
let zlib = require('zlib')
let gzip = zlib.createGzip()
let fs = require('fs')
let inp = fs.createReadStream('./streams-are-everywhere.js')
let out = fs.createWriteStream('./streams.txt.gz')

inp.pipe(gzip).pipe(out)

// Lab use gzip with the Accept-Encoding and Content-Encoding http headers to gzip
// http requests in a server. Write a node client to consume it
