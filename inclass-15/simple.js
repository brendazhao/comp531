const http = require('http')

const host = '127.0.0.1'
const port =  process.env.PORT ||3333 

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)


     if (req.method == 'GET'){
         switch(req.url){
            case '/':
                var payload = { 'hello': 'world' }
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
                break
            case '/articles':
                var payload = { articles : [{id:1, author:'Scott', body: 'A post'}, {id:2, author:'Someone1', body:'A post again'}, {id:3, author:'Someone2', body:'Done'}]}
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
                break
            default:
                res.statusCode = 404
                res.end()
         }
     }
     else if (req.method == 'POST'){
         switch(req.url){
             case '/login':
                var userinfo = JSON.parse(req.body)
                var payload = {username : userinfo.username, result: 'success'}
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200
                res.end(JSON.stringify(payload))
                break
            default:
                res.statusCode = 404
                res.end()
         }
     }
     else if (req.method == 'PUT'){
         switch(req.url){
             case '/logout':
                res.statusCode = 200
                res.end("OK")
                break
            default:
                res.statusCode = 404
                res.end()
         }
     }
     else{
         res.statusCode = 404
         res.end()
     }
}