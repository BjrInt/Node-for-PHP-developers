import { readFile } from 'fs/promises'

const displayFileLength = async () => {
  try {
    const content = await readFile()
    return content.length
  } catch (err) {
    console.log(0)
    return 0
  }
}
