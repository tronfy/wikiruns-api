import { FastifyRequest } from 'fastify'

export type WikiTitleRequest = FastifyRequest<{
  Params: {
    title: string
  }
}>
