const Request = require('../request')


class SignupRequest extends Request {
    constructor () {
        super({
            'username': 'requird|string|min:5',
            'email': 'requird|string',
            'password': 'requird|string|min:7',
        })
    }
}

module.exports = new SignupRequest