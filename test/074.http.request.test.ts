import 'reflect-metadata'
import httpMocks from 'node-mocks-http'

// import YAML from 'yaml'

import {Controller, Req, Request, Get, Res, Response} from '../src'

const testObject: object = {
  test: 1,
}

@Controller()
class TestController {

  // @Get('/has-req-argument')
  // hasReqArgument(@Req() req: Request) {
  //   return req
  // }

  @Get('/has-res-argument')
  hasResArgument(@Res res: Response) {
    return res
  }

}

describe('lib/http/request => *', () => {
  describe('Body(key:? string, decoder?: RequestBodyDecoder) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Body() => Should return return an object (even if body is empty)', () => {
      // console.log(controller.hasReqArgument)
    })

    it('@Body(`test`) => Should return value for key `test`', () => {})

    it('@Body(undefined, YAML.parse) => Should return return an object (even if body is empty)', () => {})

    it('@Body(`test`, YAML.parse) => Should return value for key `test`', () => {})
  })

  describe('Cookie(key:? string, value?: string) => ', () => {
    it('@Cookie() => Should return return an object (even if cookies is empty)', () => {})

    it('@Cookie(`test`) => Should return value for key `test`', () => {})

    it('@Cookie(`test`, `test`) => Should set value `test` for key `test`', () => {})

    it('@Cookie(undefined, `test`) => Should throw an error', () => {})
  })

  describe('Header(key:? string, value?: string) => ', () => {
    it('@Header() => Should return return an object (even if headers is empty)', () => {})

    it('@Header(`test`) => Should return value for key `test`', () => {})

    it('@Header(`test`, `test`) => Should set value `test` for key `test`', () => {})

    it('@Header(undefined, `test`) => Should throw an error', () => {})
  })

  describe('Ip() => ', () => {
    it('@Header() => Should return return an string', () => {})
  })

  describe('Param(key:? string) => ', () => {
    it('@Param() => Should return return an object (even if params is empty)', () => {})

    it('@Param(`test`) => Should return value for key `test`', () => {})
  })

  describe('Query(key:? string) => ', () => {
    it('@Query() => Should return return an object (even if query is empty)', () => {})

    it('@Query(`test`) => Should return value for key `test`', () => {})
  })

  describe('Req() => ', () => {
    it('@Req() => Should return return an object', () => {})
  })

  describe('Res() => ', () => {
    it('@Res() => Should return return an object', () => {})
  })
})
