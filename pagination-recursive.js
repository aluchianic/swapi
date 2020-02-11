const request = require('request')
const { showTime } = require('./helpers')

const baseUrl = 'https://swapi.co/api'
const endpoint = '/people'

const stash = []

function recursive(result) {
    return new Promise((resolve, reject) => {
        const url = result ? result.next : baseUrl + endpoint
        console.log(url)

        request(url, (err, data) => {
            if (err) {
                reject(err)
            }

            const body = JSON.parse(data.body)

            if (body.next) {
                stash.push(...body.results.filter(x => +x.height > 150))

                resolve(recursive({
                    body: body.results,
                    next: body.next
                }))
            } else {
                resolve(stash)
            }
        })
    })
}

const startTime = process.hrtime()

recursive().then(data => {
    console.log(data)
    console.log('length --> ', data.length)

    showTime(startTime)
}).catch(err => console.error(err))
