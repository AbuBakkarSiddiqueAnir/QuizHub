const Request = require('../request')

class LoginRequest extends Request {
    constructor () {
        super({
            'username': 'requird|string',
            'password': 'requird|string',
        })
    }
    print = x => console.log(x)
}

module.exports = new LoginRequest