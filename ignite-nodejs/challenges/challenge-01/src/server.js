import http from 'node:http'
import { jsonParser } from './middlewares/jsonParser.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

const server = http.createServer(async(req, res) => {
  await jsonParser(req, res)

  const { method, url } = req

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  const routeParams = url.match(route.path)

  const { query, ...params } =  routeParams.groups

  req.params = params
  req.query = query ? extractQueryParams(query) : {}

  return route.handler(req, res)
})

server.listen(3333)
