const md5 = require('md5')
const cookieParser = require('cookie-parser') 

let cookieKey = 'sid'

let users = []

const register = (req, res) => {
	if(!req.body.username|| !req.body.password){
		res.sendStatus(400)
		return
	}
	const salt = Math.random()
	const hash = md5(salt.toString() + req.body.password)
	users.push({username: req.body.username, salt: salt, hash: hash})
	res.send({username:req.body.username, salt:salt, hash:hash})
}

const login = (req, res) => {
    if(!req.body.username|| !req.body.password){
		res.sendStatus(400)
		return
	}
	const userObj = users.filter(r => { return r.username == req.body.username })[0]
	if(!userObj || !isAuthorized(req, userObj)){
		res.sendStatus(401)
		return
	}
    // cookie lasts for 1 hour
	res.cookie(cookieKey, userObj.hash, {MaxAge: 3600*1000, httpOnly: true})
	res.send({ username: req.body.username, result: 'success'})
}

function isAuthorized(req, userObj){
	return userObj.hash === md5(userObj.salt.toString() + req.body.password)
}

module.exports = app => {
    app.use(cookieParser());
	app.post('/register', register)
	app.post('/login', login)
}