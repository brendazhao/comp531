var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
var session =require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
var users = [];

const config = { clientSecret: 'e93e577d489930f76c57853a57cd99b4', 
					clientID: '446493699029955', 
					callbackURL: 'http://localhost:3000/auth/callback' }

// serilarize the user for the session
passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})

//deserialize the user from the session
passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null)
})

passport.use(new FacebookStrategy(config,
 function(token, refreshToken, profile, done) {
 	process.nextTick(function() {
 		//register the user in our system
 		return done(null, profile)
 	})
 }))

function logout(req, res) {
	req.logout();
	res.redirect('/')
}

function isLoggedIn(req, res, next) {
	if (req.isAuthentichated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

function profile(req, res) {
	res.send('ok now what?', req.user)
}


const addUser = (username, password) => {
    const newSalt = md5((new Date()).getTime())
    Users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}

const postRegister = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(400).send('username and password should be supplied')
        return
    }

    if (Users[req.body.username]){
        res.status(400).send('user already exists')
        return
    }

    addUser(req.body.username, req.body.password)

    res.send({
        username: Users[req.body.username].username,
        status: 'success'
    })
}

const postLogin = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }

    const userObj = Users[req.body.username]

    if (userObj && md5(req.body.password + userObj.salt) == userObj.hash){
        res.send({username:userObj.username, status:'success'})
    }
    else{
        res.status(401).send('Unauthorized')
        return
    }
}

const putLogout = (req, res) => {
    res.status(200).send('OK')
}

const putPassword = (req,res) => {
	const msg = {username:'qw12', 
	        	  status:'password will not change'
	    }
    res.send(msg)
}



module.exports = app => {
    app.post('/login', login)
    app.put('/logout', putLogout)
    app.post('/register', register)
    app.put('/password',putPassword)

    app.use(session({secret:'thisIsMySecretMessage'}))
	app.use(passport.initialize())
	app.use(passport.session())
    app.use(cookieParser())

	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	app.use('/logout',logout)
	app.use('/profile',profile)
}