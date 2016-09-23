/*
Two Modes
#

Readable streams effectively operate in one of two modes: flowing and paused.

When in flowing mode, data is read from the underlying system automatically and provided to an application as quickly as possible using events via the EventEmitter interface.

In paused mode, the stream.read() method must be called explicitly to read chunks of data from the stream.

All Readable streams begin in paused mode but can be switched to flowing mode in one of the following ways:

    Adding a 'data' event handler.
    Calling the stream.resume() method.
    Calling the stream.pipe() method to send the data to a Writable.

The Readable can switch back to paused mode using one of the following:

    If there are no pipe destinations, by calling the stream.pause() method.
    If there are pipe destinations, by removing any 'data' event handlers, and removing all pipe destinations by calling the stream.unpipe() method.

The important concept to remember is that a Readable will not generate data until a mechanism for either consuming or ignoring that data is provided. If the consuming mechanism is disabled or taken away, the Readable will attempt to stop generating the data.

*/

/*
Three States
#

The "two modes" of operation for a Readable stream are a simplified abstraction for the more complicated internal state management that is happening within the Readable stream implementation.

Specifically, at any given point in time, every Readable is in one of three possible states:

    readable._readableState.flowing = null
    readable._readableState.flowing = false
    readable._readableState.flowing = true

When readable._readableState.flowing is null, no mechanism for consuming the streams data is provided so the stream will not generate its data.

Attaching a listener for the 'data' event, calling the readable.pipe() method, or calling the readable.resume() method will switch readable._readableState.flowing to true, causing the Readable to begin actively emitting events as data is generated.

Calling readable.pause(), readable.unpipe(), or receiving "back pressure" will cause the readable._readableState.flowing to be set as false, temporarily halting the flowing of events but not halting the generation of data.

While readable._readableState.flowing is false, data may be accumulating within the streams internal buffer.
Choose One
#

The Readable stream API evolved across multiple Node.js versions and provides multiple methods of consuming stream data. In general, developers should choose one of the methods of consuming data and should never use multiple methods to consume data from a single stream.

Use of the readable.pipe() method is recommended for most users as it has been implemented to provide the easiest way of consuming stream data. Developers that require more fine-grained control over the transfer and generation of data can use the EventEmitter and readable.pause()/readable.resume() APIs.
*/
