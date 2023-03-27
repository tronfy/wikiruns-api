import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import { readFileSync } from 'fs'
import { WikiTitleRequest } from './types'

const indexes: { [key: string]: string } = {}

const app = Fastify({})

app.register(fastifyCors, {
  origin: '*',
})

app.get('/wiki/:title', async (request: WikiTitleRequest, reply) => {
  const title = request.params.title.replace(/ /g, '_').replace(/^(.)/, p => p.toUpperCase())

  const id = indexes[title]

  console.log(title, id)

  if (!id) {
    reply.status(404)
    return { error: 'Not found' }
  }

  const content = readFileSync(`data/wiki/${id}.md`, 'utf8')
  return {
    id: parseInt(id),
    title,
    content,
  }
})

const start = async () => {
  readFileSync('data/indexes.csv', 'utf8')
    .split('\n')
    .slice(1)
    .forEach(line => {
      const [id, title] = line.split(',')
      if (!id || !title) return
      // indexes[title.replace(/ /g, '_')] = id
      indexes[title] = id
    })

  try {
    const port = 3000
    await app.listen({ port })
    console.log(`listening on port ${port}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
start()
