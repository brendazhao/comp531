const index = (req, res) => {
     res.send({ hello: 'world' })
}

const profile = {
	profile: {
		'sampleUser' :{
			email:'sample@email.com',
			zipcode: 01234,
			avatar: 'sampleAvatar',
			dob: (new Date('01/01/2000')).toDateString()
		},
		'qz25':{
			email:'qz25@rice.edu',
			zipcode: 12345,
			avatar: 'qz25avatar',
			dob: (new Date('07/15/1994')).toDateString()
		},
		'yy55':{
			email:'yy55@rice.edu',
			zipcode: 23456,
			avatar: 'yy55avatar',
			dob: (new Date('05/15/1994')).toDateString()
		},
		'sq6':{
			email:'sq6@rice.edu',
			zipcode: 34567,
			avatar: 'sq6avatar',
			dob: (new Date('07/10/1990')).toDateString()
		}
	},

	headlines:{
		'sampleUser':'sample headline',
		'qz25':'this is my headline',
		'yy55':'this is yy55 headline',
		'sq6' :'this is sq6 headline'
	}
}

const getHeadline = (req, res) => {
	if (!req.user) req.user = 'sampleUser'
	const users = req.params.users ? req.params.users.split(',') : [req.user]
	const headlines = users.map((key)=>{
		return {
			username: key,
			headline: profile.headlines[key]
		}
	})
	res.send({headlines})
}

const putHeadline = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	profile.headlines[req.user] = req.body.headline
	res.send({username: req.user, headline: profile.headlines[req.user]})
}

const getEmail = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	const user = req.params.user ? req.params.user : req.user
	res.send({
		username: user,
		email: profile.profile[user].email	
	})
}

const putEmail = (req, res) => {
	console.log(req)
	if (!req.user) req.user = 'sampleUser'
	profile.profile[req.user].email = req.body.email
	res.send({username: req.user, email: profile.profile[req.user].email})
}

const getZipcode = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	const user = req.params.user ? req.params.user : req.user
	res.send({
		username: user,
		zipcode: profile.profile[user].zipcode	
	})
}

const putZipcode = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	profile.profile[req.user].zipcode = parseInt(req.body.zipcode)
	res.send({username: req.user, zipcode: profile.profile[req.user].zipcode})
}

const getDob = (req, res) =>{
	if (!req.user) req.user =  'sampleUser'
	const user = req.user 
	res.send({
		username: user,
		dob: profile.profile[user].dob	
	})
}

//TODO: FIX THIS END-POINT
const getAvatars = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	const user = req.params.user ? req.params.user : req.user
	res.send({
		username: user,
		avatar: profile.profile[user].avatar	
	})
}

const putAvatars = (req, res) => {
	if (!req.user) req.user =  'sampleUser'
	profile.profile[req.user].avatar = req.body.img
	res.send({username: req.user, avatar: profile.profile[req.user].avatar})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:users?', getHeadline)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
	 app.get('/dob',getDob)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatars)
}