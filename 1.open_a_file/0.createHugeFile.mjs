// use this script to generate a random 500mb file
import { writeFile } from "fs/promises"

const randLetter = () => {
  const words = `thequickbrownfoxjumpsoverthelazydog.?!`.split('')
  const seed = Math.random() * words.length | 0

  return words[seed]
}

const setup = async (size=10**7, path='hugefile') => {
  let buf = ''
  const tenPct = size / 10

  console.log('Generate buffer')
  for(let i=0; i<size; i++){
    if(i % tenPct === 0)
      console.log(i / tenPct + '0% done')
    
    buf += randLetter().repeat(20)
  }
  
  try{
    console.log('Write to disk')
    await writeFile(path, buf, 'binary')
  }
  catch(err){
    console.log('ERROR WRITING THE FILE')
    console.log(' ------- ')
    console.log(err)
  }
}

setup()