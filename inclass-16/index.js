
const express = require('express')
const bodyParser = require('body-parser')

let articles=[
        {"id":1, "author":"Scott", "text":"Text for Scott"},
        {"id":2, "author":"Max", "text":"Text for Max"},
        {"id":3, "author":"James", "text":"Text for James"}
    ]

const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     let id=articles[articles.length-1]["id"]+1;
     articles=[
     	...articles,
     	{
     		"id":id,
     		"author":"newAuthor",
     		"text" :req.body.text
     	}
     ]  
     res.send(articles[articles.length-1])
}


const getArticle = (req, res) => {
     res.send(JSON.stringify(articles))
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})