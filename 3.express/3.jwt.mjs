// This example requires an .env file with a JWT secret
// run 0.generate-secret.mjs to ensure you have a valid key first

import express from 'express'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { promisify } from 'util'

// Loading variables from the .env file
dotenv.config()

// Launching express
const server = express()

// Promisify the JWT helpers
// (=> transform callback into Promise based function)
const sign = promisify(JWT.sign)
const verify = promisify(JWT.verify)

// This route will encore the posted user into the token
server.post('/login', async (req, res) => {
  const { user } = req.body

  try {
    const token = await sign({ user }, process.env.JWT_SECRET, {
      algorithm: 'HS512',
      expiresIn: '1h',
    })

    return res.send(token)
  } catch (err) {
    console.log(err)
    return res.status(500).send('Cannot generate token')
  }
})

// This middleware will ensure that all subsequent routes include a valid token in the authorization header
// The 'user' variable will be added to the request object, to be used in the following request listeners
server.use(async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send('Unauthorized')

  try {
    const decoded = await verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )

    if (decoded !== undefined) {
      req.user = decoded.user
      return next()
    }
  } catch (err) {
    console.log(err)
  }

  return res.status(403).send('Invalid token')
})

server.get('/hello', (req, res) => {
  res.status(200).send({ info: 'Hello ' + req.user })
})

server.listen(8000, () => console.log('http://localhost:8000'))
