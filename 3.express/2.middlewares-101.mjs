import express from 'express'

const PORT = 3000
const app = express()

app.use((req, res, next) => {
  console.log('The first middleware is called')
  console.log(`${req.method.padStart(6, ' ')} on ${req.url} at ${new Date().toISOString()}`)

  req.someContext = 'This variable will be available in all subsequent request listeners'

  next()
})

app.get('/hello/:name', (req, res) => res.send({ info: req.someContext, data: `Hello ${req.params.name}!` }))

app.get('/bye/:name', (req, res) => res.send({ info: req.someContext, data: `Goodbye ${req.params.name}!` }))

app.use((req, res, next) => {
  console.log('No matching route found')
  next()
})

app.get('*', (req, res) => res.status(404).send({ error: `Not found` }))

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`))