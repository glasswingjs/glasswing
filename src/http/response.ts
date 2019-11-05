import {Request, RequestHandler, Response} from './_types'

// /**
//  * Comment
//  *
//  * @returns {MethodDecorator}
//  */
// export const RespondWithJson = (): MethodDecorator => {
//   return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {

//     console.log(target, propertyKey, descriptor)

//     const oldHandler = descriptor.value as RequestHandler

//     const handler: RequestHandler = (...args) => {
//       return JSON.stringify({
//         status: 'success',
//         data: JSON.stringify(descriptor.value(...args))
//       })
//     }

//     return Object.assign(descriptor, {
//       value: handler
//     })
//   }
// }
