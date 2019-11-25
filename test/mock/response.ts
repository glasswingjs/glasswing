import {IncomingMessage, ServerResponse} from 'http'

import {Response, ResponseCode, ResponseMessages} from '../../src'
import {MockRequest, req} from './request'

export interface MockResponseOptions {
  statusCode: number
  statusMessage: string
  writableFinished: boolean
}

export class MockResponse extends ServerResponse {
  constructor(req: IncomingMessage, mock?: MockResponseOptions) {
    super(req)

    this.statusCode = mock ? mock.statusCode : ResponseCode.OK
    this.statusMessage = mock ? mock.statusMessage : ResponseMessages.OK
    this.writableFinished = mock ? mock.writableFinished : true
  }
}

export const res = (): Response => new MockResponse(req() as IncomingMessage)
