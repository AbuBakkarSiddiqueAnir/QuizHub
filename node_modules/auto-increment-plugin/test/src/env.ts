import path from 'path'
import dotenv from 'dotenv'

let envPath
switch (process.env.NODE_ENV) {
    case 'production':
        envPath = path.join(__dirname, '../../.env')
        break
    case 'test':
        envPath = path.join(__dirname, '../../.env.test')
        break
    default:
        envPath = path.join(__dirname, '../../.env.dev')
}

const config = dotenv.config({path: envPath})
if (config.error) {
    console.log(config.error)
}
