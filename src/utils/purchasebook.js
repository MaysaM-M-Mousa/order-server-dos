const request = require('request')

const purchaseBookPromise = (ISBN, formData) => {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/books/' + ISBN
        request({ url, json: true, method: 'PATCH', body: formData }, (error, { body, statusCode } = {}) => {
            if (error) {
                return reject("Failed!")
            } else if (statusCode !== 200 && !body) {
                return reject("Not Found!")
            }else if(statusCode === 500){
                return reject(body)
            }
            resolve("success")
        })
    })
}

module.exports = purchaseBookPromise
