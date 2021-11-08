const request = require('request')

const checkBookPromise = (ISBN) => {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/books/info/' + ISBN

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