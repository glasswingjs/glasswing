import {HTTPVersion, Instance} from 'find-my-way'

import {Request, Response} from '../http'

export type Router = Instance<HTTPVersion.V1> | Instance<HTTPVersion.V2>

export type RouterCallable = (req: Request, res: Response) => void
