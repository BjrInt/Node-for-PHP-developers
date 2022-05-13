import { createServer } from 'http'

const PORT = 3000
const reqListener = (request, response) => {
  response.end(`You're trying to reach ${request.url} (method: ${request.method})`)
}

const server = createServer(reqListener)
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
