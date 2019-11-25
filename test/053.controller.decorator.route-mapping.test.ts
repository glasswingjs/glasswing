// import 'reflect-metadata'
// import {expect} from 'chai'
// import {IncomingMessage} from 'http'

// import {TestController} from './controller/test'
// import {req, res, bodyObject} from './mock'
// import {
//   All,
//   Delete,
//   Get,
//   getControllerPathMappings,
//   Head,
//   Options,
//   Patch,
//   Post,
//   Put,
//   Param,
//   Request,
//   Response,
//   ROUTE_REGISTRY_METADATA_NAME,
// } from '../src'

// const hmd = (key: string, target: any) => Reflect.hasMetadata(key, target)

// const gmd = (key: string, target: any) => Reflect.getMetadata(key, target)

// const mapping = (target: any, method: string, path: string) => {
//   const routes = getControllerPathMappings(target).routes.filter(
//     route => route.method === method && route.path === path,
//   )
//   return routes.length ? routes.pop() : null
// }

// describe('lib/controller/decorator/route-mapping => *', () => {
//   describe('All(route: string) => ', () => {
//     let controller: TestController

//     beforeEach(() => {
//       controller = new TestController()
//     })

//     it('@All() => Should add a @All route mapping', (done) => {
//       expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//       const route = mapping(controller, 'all', '/no-args-all')
//       expect(route).to.not.be.null
//       if (route) {
//         route.handler(req(), res(), {}).then(data => {
//           expect(data).to.equal('noArgsAll')
//           done()
//         })
//       }
//     })

//     // it('@Delete() =>  Should add a @Delete route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'delete', '/delete/:id')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {id: 10})).to.equal(`delete ${10}`)
//     //   }
//     // })

//     // it('@Get() =>  Should add a @Get route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true

//     //   const route = mapping(controller, 'get', '/no-args-get')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {id: 10})).to.equal(`noArgsGet`)
//     //   }

//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route2 = mapping(controller, 'get', '/with-req-get')
//     //   expect(route2).to.not.be.null
//     //   if (route2) {
//     //     expect(route2.handler(req(), res(), {})).to.equal(req().url)
//     //   }
//     // })

//     // it('@Head() =>  Should add a @Head route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'head', '/head')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {})).to.equal('head')
//     //   }
//     // })

//     // it('@Options() =>  Should add a @Options route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'options', '/options')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {id: 10})).to.equal('options')
//     //   }
//     // })

//     // it('@Patch() =>  Should add a @Patch route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'patch', '/no-args-patch')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {})).to.equal('noArgsPatch')
//     //   }
//     // })

//     // it('@Post() =>  Should add a @Post route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'post', '/no-args-post')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {})).to.equal('noArgsPost')
//     //   }
//     // })

//     // it('@Put() =>  Should add a @Put route mapping', () => {
//     //   expect(hmd(ROUTE_REGISTRY_METADATA_NAME, controller)).to.be.true
//     //   const route = mapping(controller, 'put', '/no-args-put')
//     //   expect(route).to.not.be.null
//     //   if (route) {
//     //     expect(route.handler(req(), res(), {})).to.equal('noArgsPut')
//     //   }
//     // })

//   })
// })
