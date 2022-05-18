import express from 'express'

const PORT = 3000
const app = express()

app.get('/hello/:name', (req, res) => res.send({ data: `Hello ${req.params.name}!` }))

app.get('/bye/:name', (req, res) => res.send({ data: `Goodbye ${req.params.name}!` }))

app.post('*', (req, res) => res.send({ info: `Information posted succesfully` }))

app.get('*', (req, res) => res.status(404).send({ error: `Not found` }))

app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`))