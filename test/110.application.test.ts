// import 'reflect-metadata'
// import {expect} from 'chai'
// // import fetch from 'node-fetch'
// import {container} from 'tsyringe'

// import {Application, registerHttpServerFactory, registerRouter, RouteRegistry, TestController} from '../src'

// registerRouter()
// registerHttpServerFactory()

// describe('lib/application => Application', () => {
//   let application: Application
//   let url: string = ''

//   before(() => {
//     // registerYamlConfig('./config.yml.template')
//     application = new Application(
//       container.resolve('ServerFactory'),
//       container.resolve('Router'),
//       container.resolve(RouteRegistry),
//     )
//     application.registerControllers([container.resolve(TestController)])
//   })

//   it('Application::constructor() will return an object', () => {
//     expect(application).to.be.an('object')
//   })

//   it('Application::inject() will return an object', () => {
//     const injectedApplication = container.resolve(Application)
//     expect(injectedApplication).to.be.an('object')
//   })

//   it('Application::registeredRoutes() will return an array', () => {
//     expect(application.registeredRoutes()).to.be.an('array')
//     expect(application.registeredRoutes().length).to.equal(
//       Reflect.getMetadata('routeRegistry', new TestController()).routes.length,
//     )
//   })

//   it('Application::start()/stop() will start, then stop the server', done => {
//     application.start().then(() => application.stop().then(done))
//   })
// })

// // describe('lib/server/server-express => fetch', () => {
// //   let server: ExpressServer
// //   let controller: TestController
// //   let url: string = ''

// //   before(() => {
// //     registerYamlConfig('./config.yml.template')
// //     registerExpressServer()
// //     controller = resolve(TestController)
// //     server = container.resolve('Server')
// //     server.registerControllers([controller])
// //     server.start()

// //     url = `http://localhost:${(resolve('Config') as Config).get('server.port')}`
// //   })

// //   after(() => {
// //     server.stop()
// //   })

// //   it('fetch(/no-args-all) GET', done => {
// //     fetch(`${url}/no-args-all`)
// //       .then(async res => res.text())
// //       .then(body => {
// //         expect(body).to.equal('noArgsAll')
// //         done()
// //       })
// //   })

// //   it('fetch(/no-args-all) POST', done => {
// //     fetch(`${url}/no-args-all`, {method: 'POST'})
// //       .then(async res => res.text())
// //       .then(body => {
// //         expect(body).to.equal('noArgsAll')
// //         done()
// //       })
// //   })

// //   it('fetch(/no-args-post)', done => {
// //     fetch(`${url}/no-args-post`, {method: 'POST'})
// //       .then(async res => res.text())
// //       .then(body => {
// //         expect(body).to.equal('noArgsPost')
// //         done()
// //       })
// //   })
// // })
