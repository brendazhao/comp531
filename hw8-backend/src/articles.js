'use strict';

const Article = require('./model.js').Article
const Profile=require('./model.js').Profile
const Comment = require('./model.js').Comments
const md5 = require('md5')
const parseIt = require("./uploadCloudinary.js");

//add article part
const addArticle = (req, res) => {
	if(!req.body.text) {
		res.status(400).send('Add articles error')
		return
	}
	const articleObj = new Article({author: req.username, img: req.fileurl, date: new Date(), text:req.content, comments: []})
	new Article(articleObj).save(function(err, article){
		if(err) throw err
		else {
			res.status(200).send({articles: [article]})
		}
	})
}
//get a article
const getArticles = (req, res) => {
	console.log(req.params.id);
	if(req.params.id){
		Article.find({_id:req.params.id}).exec(function(err, article){
			if(article === null || article.length === 0) {
				res.status(401).send('Get articles error')
				return
			}
			const articleObj = article[0]
			res.status(200).send({articles: articleObj})
		})
	} else {
	//	Article.find({}).exec(function(err, articles){
	//		res.status(200).send( { articles: articles})
//		})
		console.log('222');
  		const username = req.username;
        Profile.find({username: username}).exec(function(err, profile){
            const profileObj = profile[0]
            const usersToQuery = [username, ...profileObj.following]
            Article.find({author: {$in: usersToQuery}}).limit( 10 ).sort('-date').exec(function(err, articles){
                res.status(200).send({articles: articles})
            })
        })
	}
}
//put an article
const putArticle = (req, res) => {
	if(!req.params.id) {
		res.status(400).send('Put articles error: no id')
		return		
	}
	Article.find({_id:req.params.id}).exec(function(err, article){
		if(article === null || article.length === 0) {
			res.status(401).send('Put articles error: no specified article')
			return
		}
		if(req.body.commentId == "-1") {
			console.log("-11-1")
			const commentId = md5(req.username + new Date().getTime())
			const commentObj = new Comment({commentId: commentId, author: req.username, date: new Date(), text: req.body.text})
			new Comment(commentObj).save(function(err, comment){
				if(err) throw err
			})
			Article.findByIdAndUpdate(req.params.id, {$addToSet: {comments:commentObj}}, {upsert:true, new:true}, function(err, article){})
			Article.find({_id:req.params.id}).exec(function(err, article){
				res.status(200).send({articles: article})
			})
		} else if(req.body.commentId) {
			Comment.find({commentId: req.body.commentId}).exec(function(err, comments){
				if(comments === null || comments.length === 0) {
					res.status(401).send('Put articles error: no specified comment')
					return
				}

				if(comments[0].author === req.username) {
					Comment.update({commentId: req.body.commentId}, { $set: {text:req.body.text}}, {new:true}, function(err, comments){})
					Article.update({_id:req.params.id, 'comments.commentId':req.body.commentId}, {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, articles){})
                    Article.find({_id:req.params.id}).exec(function(err, article){
                        res.status(200).send({articles: article})
                    })					
				}
			})
		} else {
			if(article[0].author === req.username) {
				Article.findByIdAndUpdate(req.params.id, {$set: {text:req.body.text}}, {new: true}, function(err, article){
					res.status(200).send({articles: article})
				})
			}
		}
	})
}

module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', parseIt('img'),addArticle)  
	app.put('/articles/:id', putArticle)
} 
