/*
 * streams show up everywhere in node, even in simple programs
 * 
 * (talk about read, vs write, vs duplex. Talk on how streams
 * are used to not overconsume available memory but to
 * use an interal buffer to stage the data. We can set how
 * much data to buffer (via highWaterMark?)
 * 
 * For example, let's examine the use of a stream in an http server
 */

const http = require('http');

const server = http.createServer( (req, res) => {
  // req is an http.IncomingMessage, which is a Readable Stream
  // res is an http.ServerResponse, which is a Writable Stream

  let body = '';
  // Get the data as utf8 strings.
  // If an encoding is not set, Buffer objects will be received.
  req.setEncoding('utf8');

  // Readable streams emit 'data' events once a listener is added
  req.on('data', (chunk) => {
    body += chunk;
  });

  // the end event indicates that the entire body has been received
  req.on('end', () => {
    try {
      const data = JSON.parse(body);
      // write back something interesting to the user:
      res.write(typeof data);
      res.end();
    } catch (er) {
      // uh oh!  bad json!
      res.statusCode = 400;
      return res.end(`error: ${er.message}`);
    }
  });
});

server.listen(1337);

/*
 * Now let's examine a duplex buffer in a tcp server (TODO!)
 */
