const { body , validationResult} = require('express-validator')
class Request {
    constructor (rules) {
        this.validators = Object.keys(rules).map(key => body(key).custom(value => this.#setRule(rules[key], key, value)))
    }
    
    #setRule = (ruleString, key, value) => {
        const rules = ruleString.split('|') 
        key = this.#wordSplitter(key)
        key = key.charAt(0).toUpperCase() + key.slice(1)

        for (let rule of rules) {
            if (rule==='required' && !value) return Promise.reject(`${key} field is required.`)
            else if (rule==='string' && typeof value !== 'string') return Promise.reject(`${key} must be an string.`)
            else if (rule.startsWith('min:')) {
                const min = Number(rule.split(':')[1])
                if (value.length<min) return Promise.reject(`${key} must have at least ${min} character`)
            }
            else if (rule.startsWith('max:')) {
                const max = Number(rule.split(':')[1])
                if (value.length>max) return Promise.reject(`${key} must have not more than ${max} character`)
            }
        }
        return Promise.resolve(true)
    }
    
    validate = (request, response, next) => {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            const errors = {}
            error.array().map(error => errors[error.param] = error)
            if (request.headers['content-type'] === 'application/json')  {
                return response.json({
                    success: false,
                    message: errors
                })
            }
        } else next()
        
    }


    #wordSplitter = string => {
        string.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                let worldPieces = string.split(char)
                string = worldPieces[0] + " " + char + worldPieces[1]
            }
        })
        return string
    }

}

module.exports = Request