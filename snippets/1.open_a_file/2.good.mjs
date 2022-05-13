import { readFile } from "fs/promises"

try {
  const content = await readFile()
  console.log(content.length)
} catch (err) {
  console.log(err)
}