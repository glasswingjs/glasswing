import {IncomingMessage, ServerResponse} from 'http'

import {Response} from '../../src'
import {MockRequest, req} from './request'

export class MockResponse extends ServerResponse {}

export const res = (): Response => new MockResponse(req() as IncomingMessage)
