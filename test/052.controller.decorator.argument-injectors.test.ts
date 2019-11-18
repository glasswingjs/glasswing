import 'reflect-metadata'
import {expect} from 'chai'
import {IncomingMessage} from 'http'
import {Socket} from 'net'
import {container} from 'tsyringe'
import YAML from 'yaml'

import {MockRequest, MockResponse} from './mock'
import {
  Body,
  Cookie,
  Header,
  Ip,
  methodArgumentsDescriptor,
  Param,
  Query,
  Req,
  Request,
  RequestHeader,
  Res,
  Response,
} from '../src'

const bodyObject = {
  test: 'testValue',
  test2: 'testValue2',
}

class TestController {
  hasBodyAsArgument(@Body() body: any) {}

  hasYamlBodyAsArgument(@Body(undefined, YAML.parse) body: any) {}

  hasBodyKeyAsArgument(@Body('test') body: any) {}

  hasYamlBodyKeyAsArgument(@Body('test', YAML.parse) body: any) {}

  hasCookieAsArgument(@Cookie() params: any) {}

  hasCookieKeyAsArgument(@Cookie('test') param: any) {}

  hasHeaderAsArgument(@Header() params: any) {}

  hasHeaderKeyAsArgument(@Header('test') param: any) {}

  hasIpAsArgument(@Ip() param: string) {}

  hasParamAsArgument(@Param() params: any) {}

  hasParamKeyAsArgument(@Param('test') param: any) {}

  hasQueryAsArgument(@Query() params: any) {}

  hasQueryKeyAsArgument(@Query('test') param: any) {}

  hasReqAsArgument(@Req() param: any) {}

  hasResAsArgument(@Res() param: any) {}
}

const hmd = (key: string, target: any) => Reflect.hasMetadata(methodArgumentsDescriptor(key), target)

const gmd = (key: string, target: any) => Reflect.getMetadata(methodArgumentsDescriptor(key), target)

const req = (): Request =>
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

const res = (): Response => new MockResponse(req() as IncomingMessage)

const reqYaml = (): Request =>
  new MockRequest(
    {
      httpVersion: '1.1',
      httpVersionMajor: 1,
      httpVersionMinor: 1,
      complete: true,
      connection: new Socket(),
      headers: {},
      method: 'GET',
      url: '/test?test=testValue&test2=testValue2',
    },
    YAML.stringify(bodyObject),
  )

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

    it('@Body() =>  Should add a @Body argument containing the entire body object', done => {
      const metadata = gmd('hasBodyAsArgument', controller)
      expect(metadata).to.be.an('array')
      metadata[0]
        .callable(req())
        .then((data: any) => {
          expect(data).to.be.an('object')
          expect(data.test).to.be.a('string')
          expect(data.test).to.equal(bodyObject.test)
          expect(data.test2).to.equal(bodyObject.test2)
        })
        .then(done)
    })

    it('@Body(undefined, YAML.parse) =>  Should add a @Body argument containing the entire body object', done => {
      const metadata = gmd('hasYamlBodyAsArgument', controller)
      expect(metadata).to.be.an('array')
      metadata[0]
        .callable(reqYaml())
        .then((data: any) => {
          expect(data).to.be.an('object')
          expect(data.test).to.be.a('string')
          expect(data.test).to.equal(bodyObject.test)
          expect(data.test2).to.equal(bodyObject.test2)
        })
        .then(done)
    })

    it('@Body(`test`) => Should add a @Body argument containing the value for `test` key', done => {
      const metadata = gmd('hasBodyKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      metadata[0]
        .callable(req())
        .then((data: string) => {
          expect(data).to.be.a('string')
          expect(data).to.equal(bodyObject.test)
        })
        .then(done)
    })

    it('@Body(`test`, YAML.parse) => Should add a @Body argument containing the value for `test` key', done => {
      const metadata = gmd('hasYamlBodyKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      metadata[0]
        .callable(reqYaml())
        .then((data: string) => {
          expect(data).to.be.a('string')
          expect(data).to.equal(bodyObject.test)
        })
        .then(done)
    })
  })

  describe('Cookie(key:? string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Cookie() => Should add a @Cookie argument descriptor with `request` source', () => {
      expect(hmd('hasCookieAsArgument', controller)).to.be.true
      const metadata = gmd('hasCookieAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Cookie() => Should add a @Cookie argument containing the entire `request` object', () => {
      const metadata = gmd('hasCookieAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      console.log(data)
      expect(data).to.be.an('object')
      expect(data.test).to.be.a('string')
      expect(data.test).to.equal(bodyObject.test)
      expect(data.test2).to.equal(bodyObject.test2)
    })

    it('@Cookie(`test`) => Should add a @Cookie argument containing the value for `test` key from the `request` object', () => {
      const metadata = gmd('hasCookieKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)
    })
  })

  describe('Header(key:? string, value?: string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Header() => Should add a @Header argument descriptor with `request+response` source', () => {
      expect(hmd('hasHeaderAsArgument', controller)).to.be.true
      const metadata = gmd('hasHeaderAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request+response')
    })

    it('@Header() => Should add a @Header argument containing the entire `request` object', () => {
      const metadata = gmd('hasHeaderAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable({request: req(), response: res()})
      expect(data).to.be.an('object')
      expect(data.test).to.be.a('string')
      expect(data.test).to.equal(bodyObject.test)
      expect(data.test2).to.equal(bodyObject.test2)
    })

    it('@Header(`test`) => Should add a @Header argument containing the value for `test` key from the `request` object', () => {
      const metadata = gmd('hasHeaderKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable({request: req(), response: res()})
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)
    })
  })

  describe('Ip() => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Ip() => Should add a @Ip argument descriptor', () => {
      expect(hmd('hasIpAsArgument', controller)).to.be.true
      const metadata = gmd('hasIpAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Ip() => Should add a @Ip argument', () => {
      const metadata = gmd('hasIpAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.a('string')
      expect(data).to.equal('8.8.8.8')
    })
  })

  describe('Param(key:? string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Param() => Should add a @Param argument descriptor with `params` source', () => {
      expect(hmd('hasParamAsArgument', controller)).to.be.true
      const metadata = gmd('hasParamAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('params')
    })

    it('@Param() => Should add a @Param argument containing the entire params object', () => {
      const metadata = gmd('hasParamAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(bodyObject)
      expect(data).to.be.an('object')
      expect(data.test).to.be.a('string')
      expect(data.test).to.equal(bodyObject.test)
      expect(data.test2).to.equal(bodyObject.test2)
    })

    it('@Param(`test`) => Should add a @Param argument containing the value for `test` key from the `params` object', () => {
      const metadata = gmd('hasParamKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(bodyObject)
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)
    })
  })

  describe('Query(key:? string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Query() => Should add a @Query argument descriptor with `query` source', () => {
      expect(hmd('hasQueryAsArgument', controller)).to.be.true
      const metadata = gmd('hasQueryAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Query() => Should add a @Query argument containing the entire `query` object', () => {
      const metadata = gmd('hasQueryAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.an('object')
      expect(data.test).to.be.a('string')
      expect(data.test).to.equal(bodyObject.test)
      expect(data.test2).to.equal(bodyObject.test2)
    })

    it('@Query(`test`) => Should add a @Query argument containing the value for `test` key from the `query` object', () => {
      const metadata = gmd('hasQueryKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)
    })
  })

  describe('Req() => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Req() => Should add a @Req argument descriptor', () => {
      expect(hmd('hasReqAsArgument', controller)).to.be.true
      const metadata = gmd('hasReqAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })
  })

  describe('Res() => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Res() => Should add a @Res argument descriptor', () => {
      expect(hmd('hasResAsArgument', controller)).to.be.true
      const metadata = gmd('hasResAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('response')
    })
  })
})
