
const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate=require('./modules/replaceTemplate.js')
const slugify = require('slugify')
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const textIn = fs.readFileSync(`${__dirname}/txt/input.txt`, 'utf-8')
const dataObj = JSON.parse(data)
const slugs = dataObj.map(el=> slugify(el.productName))
console.log(slugify('Fresh Avocados', {lowercase: true}))


const tempOverview =fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProduct =fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard =fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')




console.log(slugs)


var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


//non-blocking asynchronous
// fs.readFile('./txt/start.txt', 'utf-8', (err,data) => {
// console.log(data)
// })

const server=http.createServer(
    (req,res)=>{

        
        
const {query, pathname}= url.parse(req.url, true); 

        //Overview page

        if(pathname==='/' || pathname==='/overview'){
            res.writeHead(200,{
                'Content-type': 'text/html',
                'My-own-header':"hello world"

            })
            

            const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

            
            const output2 = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
            res.end(output2)


            
        } 
        //product page
        else if (pathname === '/product'){

            res.writeHead(200,{
                'Content-type':'text/html',
                'My-own-header':"hello world"

            })

            const product2 = dataObj[query.id]
            const output3= replaceTemplate(tempProduct, product2)
            res.end(output3)
            
            
        }

        //API
        else if(pathname === '/api'){

            res.writeHead(404,{
                'Content-type':'application/json',
                'My-own-header':"hello world"

            })

            res.end(data)
                
        }

        //NOT FOUND
         else{

            res.writeHead(404,{
                'Content-type':'text/html',
                'My-own-header':"hello world"

            })
            res.end('<h1>Page has not been found</h1>')
        }


       }
)

server.listen(8000,'127.0.0.1')
