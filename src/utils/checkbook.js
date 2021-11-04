const request = require('request')

const checkBookPromise = (name) => {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/books/info/' + name

        request({ url, json: true }, (error, { body } = {}) => {
            if (error) {
                return reject("Failed!")
            } else if (!body) {
                return reject("Not Found!")
            }

            resolve(body[0])

        })
    })
}

module.exports = checkBookPromise