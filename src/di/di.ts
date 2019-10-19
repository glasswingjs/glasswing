import {container, InjectionToken} from 'tsyringe'

export {inject as Inject, injectable as Injectable, singleton as Singleton} from 'tsyringe'

export const resolve = <T>(token: InjectionToken<T>): T => container.resolve(token)
