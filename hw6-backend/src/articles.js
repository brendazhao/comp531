const articleslist = {
    articles:{
            "1":{id: 1, text:"sample1", author:"author1",date:new Date(), comment:[]},
            "2":{id: 2, text:"sample2", author:"author2",date:new Date(), comment:[]},
            "3":{id: 3,text:"sample3", author:"author3",date:new Date(), comment:[]}
    },
    nextid: 4
}

const addArticle = (req, res) =>{
    var id = articleslist.nextid
    articleslist.nextid++

    var newArticle ={}
    newArticle.id = id
    newArticle.text = (req.body.text || 'blank text')
    newArticle.author = (req.body.author || 'unknown author')
    newArticle.date = new Date()
    newArticle.comment = []
    articleslist.articles[newArticle.id] = newArticle
    res.send({articles : [newArticle], nextid:articleslist.nextid})

}

const returnArticle = (req, res)=>{
    if (req.params.idOrUser){
         const return_articles = {
             return_articles:{}
         }
         let i=1
         Object.keys(articleslist.articles).map((v)=>{
             if(articleslist.articles[v].author==req.params.idOrUser||v==req.params.idOrUser){
                    return_articles.return_articles[i]=articleslist.articles[v]
                    i++;
             }
        })
        res.send({articles: [return_articles.return_articles],nextid:articleslist.nextid})
    }
    else{
         res.send({articles:[articleslist.articles],nextid:articleslist.nextid})
    }
}

module.exports = (app) =>{
    app.get('/articles/:idOrUser?', returnArticle)
    app.post('/article', addArticle)
}