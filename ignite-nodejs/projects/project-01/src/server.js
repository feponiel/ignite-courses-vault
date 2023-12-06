import http from 'node:http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'POST' && url === '/users') {
    res.end('Criação de usuário')
  }

  if (method === 'GET' && url === '/posts') {
    res.end('Listagem de posts')
  }
})

server.listen(3333)
