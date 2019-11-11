export type ArgumentSource = 'request' | 'response' | 'request+response' | 'router'

export type ArgumentMapperCallable = (entity: any) => any

export interface BodyArgumentMapperCallable extends ArgumentMapperCallable {
  (req: Request): Promise<any>
}

export interface ParameterDescriptor {
  callable: ArgumentMapperCallable
  source: ArgumentSource
}
