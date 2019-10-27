// import 'reflect-metadata'
// import {expect} from 'chai'
// import fetch from 'node-fetch'
// import {container} from 'tsyringe'

// import {Application, registerHttpServerFactory} from '../src'

// registerHttpServerFactory()

// describe('lib/application => Application', () => {
//   // let server: ExpressServer
//   // let url: string = ''

//   // before(() => {
//   //   registerYamlConfig('./config.yml.template')
//   //   registerExpressServer()
//   //   server = container.resolve('Server')
//   //   server.registerControllers([resolve(TestController)])
//   // })

//   // it('ExpressServer::constructor() will return an object', () => {
//   //   expect(server).to.be.an('object')
//   // })

//   // it('ExpressServer::registerControllers() will return an array', () => {
//   //   expect(server.registeredControllers()).to.be.an('array')
//   //   expect(server.registeredControllers().length).to.equal(1)
//   // })

//   // it('ExpressServer::start()/stop() will start the server', done => {
//   //   server.start().then(() => server.stop().then(done))
//   // })
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
