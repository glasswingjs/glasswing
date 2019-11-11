import {IncomingMessage} from 'http'
import {Socket} from 'net'

export class MockRequest extends IncomingMessage {
  constructor(options?: object, body?: string) {
    super(new Socket())

    if (body) {
      this.push(body)
      this.push(null)
    }
  }
}
