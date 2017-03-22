const articles = {
    articles:{
        "1":{id: 1, text:"sample1", author:"sample1"},
        "2":{id: 2, test:"sample2", author:"sample2"},
        "3":{id: 3,text:"sample3", author:"sample3"},
        "4":{id: 4,test:"sample3", author:"sample4"},
    },
    nextID: 5
}


const addArticle = (req, res) =>{
    var id = articles.nextID
    articles.nextID++
    var newArticle = {id, text: req.body.text, author: req.body.author}
    articles.articles[newArticle.id] = newArticle
    res.send(newArticle)

}

const returnArticle = (req, res)=>{
    if (req.params.id){
        res.send(articles.articles[req.params.id])
    }
    else{
        res.send(articles.articles)
    }
}


module.exports = (app) =>{
    app.get('/articles/:id?', returnArticle)
    app.post('/article', addArticle)
}