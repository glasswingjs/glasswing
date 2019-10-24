import 'reflect-metadata'
import {expect} from 'chai'
import {container} from 'tsyringe'

import {AbstractController, HelloWorldController, RouteRegistry} from '../src'

describe('lib/controller => Controller', () => {
  let controller: AbstractController
  before(() => {
    controller = new HelloWorldController(new RouteRegistry())
  })
  it('Controller::constructor() will return an object', () => {
    expect(controller.getRouteRegistry()).to.be.an('object')
  })

  it('Controller::constructor().getRouteRegistry() will return an object', () => {
    expect(controller.getRouteRegistry()).to.be.an('object')
  })

  it('Controller::inject() will return an object', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(controller).to.be.an('object')
  })

  it('Controller::inject().getRouteRegistry() will return an object', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(anotherController.getRouteRegistry()).to.be.an('object')
  })

  //   // it('TestController::getRouteRegistry() will return an object', () => {
  //   //   expect(controller.getRouteRegistry()).to.be.an('object')
  //   // })
  //   // it('TestController::registeredRoutes() will return an array', () => {
  //   //   expect(controller.registeredRoutes()).to.be.an('array')
  //   // })
  //   // it('TestController::registerRoute()/registeredRoutes() will append to the routes array', () => {
  //   //   const length = controller.registeredRoutes().length
  //   //   controller.registerRoute(
  //   //     RequestMethod.GET,
  //   //     '/my-hello-world',
  //   //     (req: Request, res: Response, next: NextFunction) => null,
  //   //   )
  //   //   expect(controller.registeredRoutes()).to.be.an('array')
  //   //   expect(controller.registeredRoutes().length).to.equal(length + 1)
  //   // })
  //   // it('TestController::registerRoute() registerig same route will throw error', () => {
  //   //   const throwable = () => controller.registerRoute(RequestMethod.GET, '/my-hello-world', (req, res, next) => null)
  //   //   expect(throwable).to.throw()
  //   //   expect(throwable).to.throw("Route '/my-hello-world' already exists.")
  //   // })
})
