import 'reflect-metadata'
import {expect} from 'chai'
import {container} from 'tsyringe'
import {IncomingMessage} from 'http'

import {MockRequest} from './mock'
import {Body, methodArgumentsDescriptor, Request} from '../src'

class TestController {
  hasBodyAsArgument(@Body() body: any) {}

  hasBodyKeyAsArgument(@Body('test') body: any) {}
}

const hmd = (key: string, target: any) => Reflect.hasMetadata(methodArgumentsDescriptor(key), target)

const gmd = (key: string, target: any) => Reflect.getMetadata(methodArgumentsDescriptor(key), target)

const req = (): Request => {
  return new MockRequest(
    {},
    JSON.stringify({
      test: 'testValue',
    }),
  )
}

describe('lib/controller/decorator/argument-injector => *', () => {
  describe('Body(key:? string, decoder?: RequestBodyDecoder) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Body() => Should add a @Body argument descriptor with `request` source', () => {
      expect(hmd('hasBodyAsArgument', controller)).to.be.true
      const metadata = gmd('hasBodyAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Body() =>  Should add a @Body argument descriptor for the entire body object', () => {
      expect(hmd('hasBodyAsArgument', controller)).to.be.true
      const metadata = gmd('hasBodyAsArgument', controller)
      metadata[0].callable(req()).then((data: object) => console.log(data))
    })

    it('@Body(`test`) => Should return value for key `test`', () => {
      expect(hmd('hasBodyKeyAsArgument', controller)).to.be.true
    })
  })

  // describe('Cookie(key:? string, value?: string) => ', () => {
  //   it('@Cookie() => Should return return an object (even if cookies is empty)', () => {})

  //   it('@Cookie(`test`) => Should return value for key `test`', () => {})

  //   it('@Cookie(`test`, `test`) => Should set value `test` for key `test`', () => {})

  //   it('@Cookie(undefined, `test`) => Should throw an error', () => {})
  // })

  // describe('Header(key:? string, value?: string) => ', () => {
  //   it('@Header() => Should return return an object (even if headers is empty)', () => {})

  //   it('@Header(`test`) => Should return value for key `test`', () => {})

  //   it('@Header(`test`, `test`) => Should set value `test` for key `test`', () => {})

  //   it('@Header(undefined, `test`) => Should throw an error', () => {})
  // })

  // describe('Ip() => ', () => {
  //   it('@Header() => Should return return an string', () => {})
  // })

  // describe('Param(key:? string) => ', () => {
  //   it('@Param() => Should return return an object (even if params is empty)', () => {})

  //   it('@Param(`test`) => Should return value for key `test`', () => {})
  // })

  // describe('Query(key:? string) => ', () => {
  //   it('@Query() => Should return return an object (even if query is empty)', () => {})

  //   it('@Query(`test`) => Should return value for key `test`', () => {})
  // })

  // describe('Req() => ', () => {
  //   it('@Req() => Should return return an object', () => {})
  // })

  // describe('Res() => ', () => {
  //   it('@Res() => Should return return an object', () => {})
  // })
})
