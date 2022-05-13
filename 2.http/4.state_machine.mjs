import { createServer } from 'http'
import { open } from 'fs/promises'

const PORT = 3000

const createOrAppendLogs = async (url, method) => {
  const file = await open('logs.txt', 'a')
  const date = new Date()
  file.appendFile(`${method.padStart(6, ' ')} [${date.toISOString()}] ${url}\n`)
  await file.close()
}


let counter = 0
const reqListener = (request, response) => {
  const { url, method } = request
  const end = body => response.end(JSON.stringify(body))

  createOrAppendLogs(url, method)

  if(method.toUpperCase() !== 'POST'){
    response.statusCode = 400
    return end({error: 'Only POST method is allowed'})
  }
  
  switch(url){
    case '/increase':
    counter++
    return end({info: "counter increased", counter})

    case '/decrease':
    counter--
    return end({info: "counter decreased", counter})

    default:
    response.statusCode = 404
    return end({error: `${url} does not exist`})
  }
}

const server = createServer(reqListener)
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
