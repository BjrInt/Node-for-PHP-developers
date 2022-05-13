const { readFileSync } = require('fs')

const content = readFileSync('hugefile', 'utf-8')
console.log(content.length)