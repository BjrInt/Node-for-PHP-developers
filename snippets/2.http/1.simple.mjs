import { createServer } from 'http'

const PORT = 3000
const server = createServer(() => console.log('Hey!'))

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))