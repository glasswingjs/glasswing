import 'reflect-metadata'
import {expect} from 'chai'
import {IncomingMessage} from 'http'
import {Socket} from 'net'
import {container} from 'tsyringe'
import YAML from 'yaml'

import {bodyObject, req, reqYaml, res} from './mock'
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
  ResponseCode,
} from '../src'

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

  has2ParamKeyAsArgument(@Param('test') param: any, @Param('test2') param2: any) {}

  hasQueryAsArgument(@Query() params: any) {}

  hasQueryKeyAsArgument(@Query('test') param: any) {}

  hasReqAsArgument(@Req() param: any) {}

  hasResAsArgument(@Res() param: any) {}
}

const hmd = (key: string, target: any) => Reflect.hasMetadata(methodArgumentsDescriptor(key), target)

const gmd = (key: string, target: any) => Reflect.getMetadata(methodArgumentsDescriptor(key), target)

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

    it('@Body() =>  Should add a @Body argument containing the entire `body` object', done => {
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

    it('@Body(undefined, YAML.parse) => Should add a @Body argument containing the entire `body` object', done => {
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

    it('@Body(`test`) => Should add a @Body argument containing the value for `test` key from the `body` object', done => {
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

    it('@Body(`test`, YAML.parse) => Should add a @Body argument containing the value for `test` key from the `body` object', done => {
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

    it('@Cookie() => Should add a @Cookie argument containing the entire `cookies` object', () => {
      const metadata = gmd('hasCookieAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.an('object')
      expect(data.test.value).to.be.a('string')
      expect(data.test.value).to.equal(bodyObject.test)
      expect(data.test2.value).to.equal(bodyObject.test2)
    })

    it('@Cookie(`test`) => Should add a @Cookie argument containing the value for `test` key from the `cookies` object', () => {
      const metadata = gmd('hasCookieKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.a('object')
      expect(data.value).to.be.a('string')
      expect(data.value).to.equal(bodyObject.test)
    })
  })

  describe('Header(key:? string, value?: string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Header() => Should add a @Header argument descriptor with `request` source', () => {
      expect(hmd('hasHeaderAsArgument', controller)).to.be.true
      const metadata = gmd('hasHeaderAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Header() => Should add a @Header argument containing the entire `headers` object', () => {
      const metadata = gmd('hasHeaderAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.an('object')
      expect(data.test).to.be.a('string')
      expect(data.test).to.equal(bodyObject.test)
      expect(data.test2).to.equal(bodyObject.test2)
    })

    it('@Header(`test`) => Should add a @Header argument containing the value for `test` key from the `headers` object', () => {
      const metadata = gmd('hasHeaderKeyAsArgument', controller)
      expect(metadata).to.be.an('array')
      const data = metadata[0].callable(req())
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)
    })
  })

  describe('Ip() => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Ip() => Should add a @Ip argument descriptor with `request` source', () => {
      expect(hmd('hasIpAsArgument', controller)).to.be.true
      const metadata = gmd('hasIpAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Ip() => Should add a @Ip argument containing the request source ip', () => {
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

    it('@Param() => Should add a @Cookie argument descriptor with `params` source', () => {
      expect(hmd('hasParamAsArgument', controller)).to.be.true
      const metadata = gmd('hasParamAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('params')
    })

    it('@Param() => Should add a @Param argument containing the entire `params` object', () => {
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

    it('@Param(`test`), @Params(`test2`) => Should add @Param argumenta containing the value for `test` and `test2` keys from the `params` object', () => {
      const metadata = gmd('has2ParamKeyAsArgument', controller)
      expect(metadata).to.be.an('array')

      const data = metadata[0].callable(bodyObject)
      expect(data).to.be.a('string')
      expect(data).to.equal(bodyObject.test)

      const data2 = metadata[1].callable(bodyObject)
      expect(data2).to.be.a('string')
      expect(data2).to.equal(bodyObject.test2)
    })
  })

  describe('Query(key:? string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Query() => Should add a @Query argument descriptor with `request` source', () => {
      expect(hmd('hasQueryAsArgument', controller)).to.be.true
      const metadata = gmd('hasQueryAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')
    })

    it('@Query() => Should add a @Body argument containing the entire `query` object', () => {
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

    it('@Req() => Should add a @Req argument descriptor with `request` source', () => {
      expect(hmd('hasReqAsArgument', controller)).to.be.true

      const metadata = gmd('hasReqAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('request')

      const data = metadata[0].callable(req())
      expect(data).to.be.a('object')
      expect(data.url).to.equal(req().url)
    })
  })

  describe('Res() => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@Res() => Should add a @Res argument descriptor with `response` source', () => {
      expect(hmd('hasResAsArgument', controller)).to.be.true

      const metadata = gmd('hasResAsArgument', controller)
      expect(metadata.length).to.equal(1)
      expect(metadata[0].source).to.be.a('string')
      expect(metadata[0].source).to.equal('response')

      const data = metadata[0].callable(res())
      expect(data).to.be.a('object')
      expect(data.statusCode).to.equal(ResponseCode.OK)
    })
  })
})
