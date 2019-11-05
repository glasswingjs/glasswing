import 'reflect-metadata'
import {expect} from 'chai'
import {Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'
// import {Http2Server, Http2SecureServer} from 'http2'
import {Server} from 'net'
import {container} from 'tsyringe'

import {Controller, Req, Request} from '../src'

const testObject: object = {
  test: 1,
}

@Controller()
class ShouldRespondWithJson {
  testReq(@Req request: Request) {}
}

// describe('lib/http/response => *', () => {

//   it('HttpServerFactory::constructor() will return an object', () => {

//   })
// })

// // https://nodejs.org/dist/latest-v10.x/docs/api/util.html#util_util_types_isasyncfunction_value
