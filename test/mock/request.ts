import {IncomingHttpHeaders, IncomingMessage} from 'http'
import {Socket} from 'net'

import {Request, RequestHeader} from '../../src'

export interface MockRequestOptions {
  httpVersion: string
  httpVersionMajor: number
  httpVersionMinor: number
  complete: boolean
  connection: Socket
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

export const bodyObject = {
  test: 'testValue',
  test2: 'testValue2',
}

export const req = (): Request =>
  new MockRequest(
    {
      httpVersion: '1.1',
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      complete: true,
      connection: new Socket(),
      headers: {
        [RequestHeader.COOKIE.toLowerCase()]: 'test=testValue; test2=testValue2',
        [RequestHeader.X_FORWARDED_FOR.toLowerCase()]: '8.8.8.8',
        test: 'testValue',
        test2: 'testValue2',
      },
      method: 'GET',
      url: '/test?test=testValue&test2=testValue2',
    },
    JSON.stringify(bodyObject),
  )
