import { createServer } from 'http'
import { readFile, readdir } from 'fs/promises'

const PORT = 3000
const reqListener = async (request, response) => {
  const { url } = request
  try {
    if(url === '/'){
      const dir = await readdir('.')

      response.write('<h1>Index</h1><ul>')
      dir.forEach(file => {
        response.write(`<li><a href="${file}">${file}</a></li>`)
      })

      return response.end('</ul>')
    }

    if(url.match(/\.mjs$/)){
      response.statusCode = 403
      return response.end('You cannot inspect my sourcecode')
    }

    const content = await readFile(url.substring(1), 'utf-8')
    return response.end(content)
    
  } catch (err) {
    response.statusCode = 404
    return response.end(`The requested url (${url}) does not exist`)
  }
}

const server = createServer(reqListener)
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
