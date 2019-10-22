import Router from 'router'
import {container} from 'tsyringe'

export const registeRouter = () =>
  container.register('Router', {
    useFactory: () => new Router(),
  })

// https://www.npmjs.com/package/find-my-way
