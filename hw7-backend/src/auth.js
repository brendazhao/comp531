
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var session =require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
const md5 = require('md5')
const redis = require('redis').createClient('redis://h:p8fcbc8c43cf889e7259565aec8d5c4960a4245d168c9c30b27738ed35a642e92@ec2-34-206-56-163.compute-1.amazonaws.com:27269')

redis.on("error", function(err){
    console.log("Redis-Error: " +  err)
})

var users = [];
var mySecretMessage = 'i am a little baby'
var cookieKey='littleid'
const salt = md5('11/03/2016')
const User = require('./model.js').Users
const Profile = require('./model.js').Profile

//register function
const postRegister = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(400).send('username and password should be supplied')
        return
    }
    var username = req.body.username;
	var email = req.body.email;
	var dob = req.body.dob;//getTime();
	var zipcode = req.body.zipcode; 
	var password = req.body.password;
	var headline = "A default headline"
	if(!username || !password || !dob || !zipcode || !password){
		res.status(400).send("all fields should be filled in")
		return
	}
	else{
	//find whether the user already exist
	User.find({username:username}).exec(function(err, users){
		if(err)
			return console.log(err)
		else{
			if(users.length !== 0){
				res.status(400).send("this username has already been used")
				return
			}
			else{
				var salt = md5((new Date()).getTime())
				var hash = md5(password+salt)
				var obj_user = new User({username:username, salt:salt, hash:hash})
				new User(obj_user).save(function (err, user){
					if(err) 
						return console.log(err)
				})
				var obj_profile = new Profile({username:username, email:email, 
					following:[], dob:dob, headline:'default headline', zipcode:zipcode,
					avatar:'http://cistercianinformer.com/wp-content/uploads/2016/01/rice-logo.png',
					headline: headline})
				new Profile(obj_profile).save(function (err, user){
					
					if(err)
						return console.log(err)
					})
				res.status(200).send({result:'success', username:username})
                }
		}
	})
	}
}
//login function
const postLogin = (req, res) => {
    if (!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }
   var username = req.body.username;
	var password = req.body.password;
	if(!username || !password){
		res.status(400).send("missing password or username")
		return
	}
	//check whether this user has registered or not
	User.find({username: username}).exec(function(err, users){
		if(err)
			return console.log(err)
		else{
		    if (!users  || users.length === 0){
		        res.status(401).send("this username hasn't been registered")
		        return
		    }
		    obj_user = users[0]
			if(!obj_user){
				res.status(401).send("Don't have this user")
				return
			}
			var sid = md5(mySecretMessage + new Date().getTime() + obj_user.username)
			if(md5(password+obj_user.salt) == obj_user.hash){
				redis.hmset(sid, obj_user)
				res.cookie(cookieKey, sid,{maxAge: 3600*1000, httpOnly: true})
				var msg = {username:username, result: 'success'}
				res.status(200).send(msg)
			}
			else {
				res.status(401).send("incorrect password")
			}
		}
	})
}
//log out function
const putLogout = (req, res) => {
     if (req.sessionid || req.user){
        req.user = null
        redis.del(req.sessionid)
		  redis.del(req.cookies[cookieKey])

        req.sessionid = null
        
    }
    res.clearCookie(cookieKey)
    res.status(200).send('OK')
    //res.redirect('/')  
}
//change a password
const putPassword = (req,res) => {
	if (req.body.password){
        User.find({username: req.username}).exec(function(e,u){
            if (e){
                console.log(e)
                res.statusSend(500)
                return
            }

            User.update({username: req.username}, {$set: {hash: md5(req.body.password + u[0].salt)}}, function(err){
                if (err){
                    console.log(err)
                    res.statusSend(500)
                    return
                }
                res.send({username: u[0].username, status: 'success'})
                return
            })
        })
    }
    else{
        res.statusSend(400)
    }
}
//we will run it everytime, we process an action
const isLoggedIn = (req, res, next) => {
	console.log('isloggedin')
	var sid = req.cookies[cookieKey]

	if (!sid){
        return res.status(401).send('Not Authorized')
    }
    redis.hgetall(sid, function(err, userObj) {
    	if(err) {
    		console.log('Error: ${err}')
    	}
    //	console.log(sid + 'mapped to ' + userObj)
    	if(userObj){
    		req.username = userObj.username
		//	  res.status(200).send('OK')
			next()
		}
		else{
			res.redirect('/login')
		}
    })
}

module.exports = app => {
    app.post('/login', postLogin)
	app.post('/register', postRegister)
	app.use(isLoggedIn)
	app.put('/logout', putLogout)
    app.put('/password',putPassword)

    //app.use(session({secret:'thisIsMySecretMessage'}))
//	app.use(passport.initialize())
//	app.use(passport.session())
    app.use(cookieParser())

//	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
//	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	
}