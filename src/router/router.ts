import RouterFactory from 'find-my-way'
import {Instance, HTTPVersion} from 'find-my-way'
import {container} from 'tsyringe'

export type Router = Instance<HTTPVersion.V1> | Instance<HTTPVersion.V2>

export const registeRouter = () =>
  container.register('Router', {
    useFactory: () => RouterFactory(),
  })
