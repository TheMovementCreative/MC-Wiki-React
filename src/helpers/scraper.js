const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')


const hyperLink = 'http://themovementcreative.wikidot.com'
const catagory = 'games'

const writeStream = fs.createWriteStream("output"+catagory+".txt")

//Write Title of doc
writeStream.write('List of '+catagory+"\n \n")

pageParse(hyperLink +'/'+ catagory)

function pageParse(pageLink){
axios.get(pageLink).then((response) => {

    const $ = cheerio.load(response.data);
    const urlElements = $('#list-pages-box').contents().text();

    //selector
    //#page-content > div.list-pages-box > div:nth-child(1) > table > tbody > tr > td > strong > a

    //js Path
    //document.querySelector("#page-content > div.list-pages-box > div:nth-child(1) > table > tbody > tr > td > strong > a")

        //console.log(urlElements)
    $('div.list-pages-box a').each((i,el) => {
        const item = $(el).text()
        const link = $(el).attr('href')
        
        //axios.get(hyperLink+"/"+el.html())


        console.log(i+": "+item + " - link = "+ hyperLink + link);

        if(item == 'next »'){
            console.log("NEXT PAGE CALLED")
            pageParse('http://themovementcreative.wikidot.com'+link)
        }
        //check if item is a navigation element
        if(!$(el).hasClass('pager')){ 
        axios.get(hyperLink+link).then((response2) => {

            const $$ = cheerio.load(response2.data);
            
            const urlElements = $$('#page-content').text()
            //game title
            //document.querySelector("#skrollr-body > div.container-wrap-wrap > div.container-wrap > main > div > div > div > div > div.page-title.page-header > span")
            const pageTitle = $$('div.page-title.page-header').text()
            //console.log(pageTitle +urlElements)


            
            writeStream.write('\n \n \n'+pageTitle+urlElements)
        })
        }
    })

    //next button path
    //document.querySelector("#page-content > div.list-pages-box > div.pager > span:nth-child(4) > a")
    //check to see if ther is another element after pager "current", if so run this program again with the new html
})
}
