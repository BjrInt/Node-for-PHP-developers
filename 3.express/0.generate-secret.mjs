import { randomBytes } from 'crypto'
import { writeFile } from 'fs/promises'

await writeFile(
  '.env',
  `JWT_SECRET=${randomBytes(128).toString('hex')}\nPORT=3000`,
  'utf-8'
)
