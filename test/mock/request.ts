import {IncomingHttpHeaders, IncomingMessage} from 'http'
import {Socket} from 'net'

export interface MockRequestOptions {
  headers: IncomingHttpHeaders
  method?: string
  url?: string
}

export class MockRequest extends IncomingMessage {
  constructor(mock: MockRequestOptions, body?: string) {
    super(new Socket())

    this.headers = mock.headers
    this.method = mock.method
    this.url = mock.url

    if (body) {
      this.push(body)
      this.push(null)
    }
  }
}
