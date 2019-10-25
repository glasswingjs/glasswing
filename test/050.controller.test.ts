import 'reflect-metadata'
import {expect} from 'chai'
import {container} from 'tsyringe'

import {AbstractController, Get, HelloWorldController, Route, RouteRegistry, Singleton, RequestMethod} from '../src'

@Singleton()
class MyController extends AbstractController {
  @Get('/my-hello-world')
  public helloWorld(): string {
    return 'Hello World!'
  }
}

describe('lib/controller => AbstractController', () => {
  let controller: any
  before(() => {
    controller = new MyController()
  })
  it('Controller::constructor() will return an object', () => {
    expect(controller).to.be.an('object')
  })

  it('Controller::constructor() routeRegistry metadata to be a RouteRegistry instance', () => {
    expect(Reflect.hasMetadata('routeRegistry', controller)).to.be.true
    expect(Reflect.getMetadata('routeRegistry', controller)).to.be.an('object')
    expect(Reflect.getMetadata('routeRegistry', controller) instanceof RouteRegistry).to.be.true
  })

  it('Controller::inject() will return an object', () => {
    const anotherController = container.resolve(MyController)
    expect(anotherController).to.be.an('object')
  })

  it('Controller::inject() routeRegistry metadata to be a RouteRegistry instance', () => {
    const anotherController = container.resolve(MyController)
    expect(Reflect.hasMetadata('routeRegistry', anotherController)).to.be.true
    expect(Reflect.getMetadata('routeRegistry', anotherController)).to.be.an('object')
    expect(Reflect.getMetadata('routeRegistry', anotherController) instanceof RouteRegistry).to.be.true
  })

  it('Controller routeRegistry will contain /my-hello-world route', () => {
    const routeRegistry: RouteRegistry = Reflect.getMetadata('routeRegistry', controller) as RouteRegistry
    const route: Route = routeRegistry.routes.find(r => r.method === RequestMethod.GET && r.path === '/my-hello-world') as Route
    expect(route).to.be.an('object')
  })
})

describe('lib/controller => @Controller', () => {
  let controller: any
  before(() => {
    controller = new HelloWorldController()
  })
  it('Controller::constructor() will return an object', () => {
    expect(controller).to.be.an('object')
  })

  it('Controller::constructor() routeRegistry metadata to be a RouteRegistry instance', () => {
    expect(Reflect.hasMetadata('routeRegistry', controller)).to.be.true
    expect(Reflect.getMetadata('routeRegistry', controller)).to.be.an('object')
    expect(Reflect.getMetadata('routeRegistry', controller) instanceof RouteRegistry).to.be.true
  })

  it('Controller::inject() will return an object', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(anotherController).to.be.an('object')
  })

  it('Controller::inject() routeRegistry metadata to be a RouteRegistry instance', () => {
    const anotherController = container.resolve(HelloWorldController)
    expect(Reflect.hasMetadata('routeRegistry', anotherController)).to.be.true
    expect(Reflect.getMetadata('routeRegistry', anotherController)).to.be.an('object')
    expect(Reflect.getMetadata('routeRegistry', anotherController) instanceof RouteRegistry).to.be.true
  })

  it('Controller routeRegistry will contain /hello-world route', () => {
    const routeRegistry: RouteRegistry = Reflect.getMetadata('routeRegistry', controller) as RouteRegistry
    const route: Route = routeRegistry.routes.find(r => r.method === RequestMethod.GET && r.path === '/hello-world') as Route
    expect(route).to.be.an('object')
  })
})
