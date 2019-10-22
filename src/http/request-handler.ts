import {Request} from './request'
import {Response} from './response'

export interface NextFunction {
  // tslint:disable-next-line callable-types (In ts2.1 it thinks the type alias has no call signatures)
  (err?: any): void
}

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => void
