const axios = require('axios')
const cheerio = require('cheerio')

axios.get('http://themovementcreative.wikidot.com/game:scramble').then((response) => {

    const $ = cheerio.load(response.data)
    const urlElements = $('#page-content').text()

        console.log(urlElements)
})