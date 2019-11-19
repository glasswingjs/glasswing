import 'reflect-metadata'
import {expect} from 'chai'
import {IncomingMessage} from 'http'

import {TestController} from './controller/test'
import {req, res, bodyObject} from './mock'
import {
  All,
  Delete,
  Get,
  getControllerPathMappings,
  Head,
  Options,
  Patch,
  Post,
  Put,
  Param,
  Request,
  Response,
  ROUTE_REGISTRY_METADATA_NAME,
} from '../src'

const hmd = (key: string, target: any) => Reflect.hasMetadata(key, target)

const gmd = (key: string, target: any) => Reflect.getMetadata(key, target)

const mapping = (target: any, method: string, path: string) => {
  const routes = getControllerPathMappings(target).routes.filter(
    route => route.method === method && route.path === path,
  )
  return routes.length ? routes.pop() : null
}

describe('lib/controller/decorator/route-mapping => *', () => {
  describe('All(route: string) => ', () => {
    let controller: TestController

    beforeEach(() => {
      controller = new TestController()
    })

    it('@All() => Should add a @All route mapping', () => {
      expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
      const route = mapping(controller, 'all', '/no-args-all')
      expect(route).to.not.be.null
      if (route) {
        expect(route.handler(req(), res(), {})).to.equal('noArgsAll')
      }
    })

    // it('@Delete() =>  Should add a @Body argument containing the entire `body` object', done => {
    //   const metadata = gmd('hasBodyAsArgument', controller)
    //   expect(metadata).to.be.an('array')
    //   metadata[0]
    //     .callable(req())
    //     .then((data: any) => {
    //       expect(data).to.be.an('object')
    //       expect(data.test).to.be.a('string')
    //       expect(data.test).to.equal(bodyObject.test)
    //       expect(data.test2).to.equal(bodyObject.test2)
    //     })
    //     .then(done)
    // })

    // it('@Body(undefined, YAML.parse) => Should add a @Body argument containing the entire `body` object', done => {
    //   const metadata = gmd('hasYamlBodyAsArgument', controller)
    //   expect(metadata).to.be.an('array')
    //   metadata[0]
    //     .callable(reqYaml())
    //     .then((data: any) => {
    //       expect(data).to.be.an('object')
    //       expect(data.test).to.be.a('string')
    //       expect(data.test).to.equal(bodyObject.test)
    //       expect(data.test2).to.equal(bodyObject.test2)
    //     })
    //     .then(done)
    // })

    // it('@Body(`test`) => Should add a @Body argument containing the value for `test` key from the `body` object', done => {
    //   const metadata = gmd('hasBodyKeyAsArgument', controller)
    //   expect(metadata).to.be.an('array')
    //   metadata[0]
    //     .callable(req())
    //     .then((data: string) => {
    //       expect(data).to.be.a('string')
    //       expect(data).to.equal(bodyObject.test)
    //     })
    //     .then(done)
    // })

    // it('@Body(`test`, YAML.parse) => Should add a @Body argument containing the value for `test` key from the `body` object', done => {
    //   const metadata = gmd('hasYamlBodyKeyAsArgument', controller)
    //   expect(metadata).to.be.an('array')
    //   metadata[0]
    //     .callable(reqYaml())
    //     .then((data: string) => {
    //       expect(data).to.be.a('string')
    //       expect(data).to.equal(bodyObject.test)
    //     })
    //     .then(done)
    // })
  })

  // describe('Cookie(key:? string) => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Cookie() => Should add a @Cookie argument descriptor with `request` source', () => {
  //     expect(hmd('hasCookieAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasCookieAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('request')
  //   })

  //   it('@Cookie() => Should add a @Cookie argument containing the entire `cookies` object', () => {
  //     const metadata = gmd('hasCookieAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(req())
  //     expect(data).to.be.an('object')
  //     expect(data.test.value).to.be.a('string')
  //     expect(data.test.value).to.equal(bodyObject.test)
  //     expect(data.test2.value).to.equal(bodyObject.test2)
  //   })

  //   it('@Cookie(`test`) => Should add a @Cookie argument containing the value for `test` key from the `cookies` object', () => {
  //     const metadata = gmd('hasCookieKeyAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(req())
  //     expect(data).to.be.a('object')
  //     expect(data.value).to.be.a('string')
  //     expect(data.value).to.equal(bodyObject.test)
  //   })
  // })

  // describe('Header(key:? string, value?: string) => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Header() => Should add a @Header argument descriptor with `request` source', () => {
  //     expect(hmd('hasHeaderAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasHeaderAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('request')
  //   })

  //   it('@Header() => Should add a @Header argument containing the entire `headers` object', () => {
  //     const metadata = gmd('hasHeaderAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable({request: req(), response: res()})
  //     expect(data).to.be.an('object')
  //     expect(data.test).to.be.a('string')
  //     expect(data.test).to.equal(bodyObject.test)
  //     expect(data.test2).to.equal(bodyObject.test2)
  //   })

  //   it('@Header(`test`) => Should add a @Header argument containing the value for `test` key from the `headers` object', () => {
  //     const metadata = gmd('hasHeaderKeyAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable({request: req(), response: res()})
  //     expect(data).to.be.a('string')
  //     expect(data).to.equal(bodyObject.test)
  //   })
  // })

  // describe('Ip() => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Ip() => Should add a @Ip argument descriptor with `request` source', () => {
  //     expect(hmd('hasIpAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasIpAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('request')
  //   })

  //   it('@Ip() => Should add a @Ip argument containing the request source ip', () => {
  //     const metadata = gmd('hasIpAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(req())
  //     expect(data).to.be.a('string')
  //     expect(data).to.equal('8.8.8.8')
  //   })
  // })

  // describe('Param(key:? string) => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Param() => Should add a @Cookie argument descriptor with `params` source', () => {
  //     expect(hmd('hasParamAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasParamAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('params')
  //   })

  //   it('@Param() => Should add a @Param argument containing the entire `params` object', () => {
  //     const metadata = gmd('hasParamAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(bodyObject)
  //     expect(data).to.be.an('object')
  //     expect(data.test).to.be.a('string')
  //     expect(data.test).to.equal(bodyObject.test)
  //     expect(data.test2).to.equal(bodyObject.test2)
  //   })

  //   it('@Param(`test`) => Should add a @Param argument containing the value for `test` key from the `params` object', () => {
  //     const metadata = gmd('hasParamKeyAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(bodyObject)
  //     expect(data).to.be.a('string')
  //     expect(data).to.equal(bodyObject.test)
  //   })
  // })

  // describe('Query(key:? string) => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Query() => Should add a @Query argument descriptor with `request` source', () => {
  //     expect(hmd('hasQueryAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasQueryAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('request')
  //   })

  //   it('@Query() => Should add a @Body argument containing the entire `query` object', () => {
  //     const metadata = gmd('hasQueryAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(req())
  //     expect(data).to.be.an('object')
  //     expect(data.test).to.be.a('string')
  //     expect(data.test).to.equal(bodyObject.test)
  //     expect(data.test2).to.equal(bodyObject.test2)
  //   })

  //   it('@Query(`test`) => Should add a @Query argument containing the value for `test` key from the `query` object', () => {
  //     const metadata = gmd('hasQueryKeyAsArgument', controller)
  //     expect(metadata).to.be.an('array')
  //     const data = metadata[0].callable(req())
  //     expect(data).to.be.a('string')
  //     expect(data).to.equal(bodyObject.test)
  //   })
  // })

  // describe('Req() => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Req() => Should add a @Req argument descriptor with `request` source', () => {
  //     expect(hmd('hasReqAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasReqAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('request')
  //   })
  // })

  // describe('Res() => ', () => {
  //   let controller: TestController

  //   beforeEach(() => {
  //     controller = new TestController()
  //   })

  //   it('@Res() => Should add a @Res argument descriptor with `response` source', () => {
  //     expect(hmd('hasResAsArgument', controller)).to.be.true
  //     const metadata = gmd('hasResAsArgument', controller)
  //     expect(metadata.length).to.equal(1)
  //     expect(metadata[0].source).to.be.a('string')
  //     expect(metadata[0].source).to.equal('response')
  //   })
  // })
})
