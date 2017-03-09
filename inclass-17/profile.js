const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	var user;
	if(req.params.user==null){
		user='someone'
	}
	else{
		user=req.params.user;
	}
	res.send({headlines:[
		{username: user, headline: 'Someone1 headline'},
		{username: user, headline: 'Someone2 headline'}
	]})
}

const putHeadline = (req, res) => {
	res.send({
		username: 'qz25',
		headline: req.body.headline || 'you did not supply headline'
	})
}

const getEmail = (req, res) => {
	var user;
	if(req.params.user==null){
		user='someone'
	}
	else{
		user=req.params.user;
	}
	res.send(
		{username: user, email: user+'@gmail.com'}
	)
}

const putEmail = (req, res) => {
	res.send({
		username: 'qz25',
		email: req.body.email || 'you did not supply email'
	})
}

const getZipcode = (req, res) => {
		var user;
	if(req.params.user==null){
		user='someone'
	}
	else{
		user=req.params.user;
	}
	res.send(
		{username: user, zipcode: '12345'}
	)
}

const putZipcode = (req, res) => {
	res.send({
		username: 'qz25',
		zipcode: req.body.zipcode || 'you did not supply zipcode'
	})
}

const getAvatars = (req, res) => {
	var user;
	if(req.params.user==null){
		user='someone'
	}
	else{
		user=req.params.user;
	}
	res.send({avatars:[
		{username: user, avatar: 'https://img3.doubanio.com/lpic/s3258104.jpg'}
	]})
}

const putAvatar = (req, res) => {
	res.send({
		username: 'qz25',
		avatar: req.body.avatar || 'you did not supply file'
	})
}
module.exports = app => {
     app.get('/', index)

     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)

     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)

     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)

     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}
