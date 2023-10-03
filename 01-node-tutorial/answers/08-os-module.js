const os = require('os')

//info about current user
const user = os.userInfo()
console.log(user)

//info about os current version
const version = os.version()
console.log(version)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
    hostname: os.hostname(),
}

console.log(currentOS)
