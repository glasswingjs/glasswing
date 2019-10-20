import 'reflect-metadata'
import {container} from 'tsyringe'

import {expect} from 'chai'

import {AbstractController, ControllerRouteRegistry, HelloWorldController, RequestMethod, resolve} from '../src'

describe('lib/crontroller => ControllerRouteRegistry', () => {
  let routeRegistry: ControllerRouteRegistry

  beforeEach(() => {
    routeRegistry = resolve(ControllerRouteRegistry) as ControllerRouteRegistry
  })

  it('ControllerRouteRegistry::singleton() will return an object', () => {
    expect(routeRegistry).to.be.an('object')
  })
})

describe('lib/controller => Controller', () => {
  // let controller: AbstractController
  // before(() => {
  //   controller = resolve(HelloWorldController)
  // })
  // it('Controller::constructor() will return an object', () => {
  //   expect(controller).to.be.an('object')
  // })
  // it('TestController::getRouteRegistry() will return an object', () => {
  //   expect(controller.getRouteRegistry()).to.be.an('object')
  // })
  // it('TestController::registeredRoutes() will return an array', () => {
  //   expect(controller.registeredRoutes()).to.be.an('array')
  // })
  // it('TestController::registerRoute()/registeredRoutes() will append to the routes array', () => {
  //   const length = controller.registeredRoutes().length
  //   controller.registerRoute(
  //     RequestMethod.GET,
  //     '/my-hello-world',
  //     (req: Request, res: Response, next: NextFunction) => null,
  //   )
  //   expect(controller.registeredRoutes()).to.be.an('array')
  //   expect(controller.registeredRoutes().length).to.equal(length + 1)
  // })
  // it('TestController::registerRoute() registerig same route will throw error', () => {
  //   const throwable = () => controller.registerRoute(RequestMethod.GET, '/my-hello-world', (req, res, next) => null)
  //   expect(throwable).to.throw()
  //   expect(throwable).to.throw("Route '/my-hello-world' already exists.")
  // })
})
