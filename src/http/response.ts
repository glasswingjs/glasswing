import {Request, RequestHandler, Response} from './_types'

// /**
//  * Comment
//  *
//  * @returns {MethodDecorator}
//  */
// export const RespondWithJson = (): MethodDecorator => {
//   return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {

//     const oldHandler = descriptor.value as RequestHandler

//     const handler: RequestHandler = (req: Request, res: Response) => {
//       try {
//         res.end(JSON.stringify({
//           status: 'success',
//           data: JSON.stringify(descriptor.value.)
//         }))
//       } catch (e) {
//         res.setHeader('', 400)
//         res.end(JSON.stringify(oldHandler(req, res)))
//       }
//     }

//     return Object.assign(descriptor, {
//       value: handler
//     })
//   }
// }
