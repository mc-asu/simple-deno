const fs = require('fs').promises
const text = 'was geht'

fs.writeFile('node-message.txt', text).then(() =>{
    console.log('was geth')
})