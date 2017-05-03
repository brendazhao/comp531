
var request = require('request')
var qs = require('querystring')
var express = require('express')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var session =require('express-session')
var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;
const md5 = require('md5')
const redis = require('redis').
createClient('redis://h:pef7c22272c05475c08856d67c65b7f416c6aa63b9e2a84963e2b5f3d469dcc80@ec2-34-206-214-110.compute-1.amazonaws.com:14179')

redis.on("error", function(err){
    console.log("Redis-Error: " +  err)
})

var users = [];
var mySecretMessage = 'i am a little baby'
var cookieKey='littleid'
const salt = md5('11/03/2016')
const User = require('./model.js').Users
const Profile = require('./model.js').Profile
const Article =require('./model.js').Article

const config = { clientSecret: 'e93e577d489930f76c57853a57cd99b4', 
					clientID: '446493699029955', 
					callbackURL: 'https://hw8qz25.herokuapp.com/auth/callback',
				    passReqToCallback: true }

let hostUrl=''

// serilarize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id)
})

//deserialize the user from the session
passport.deserializeUser(function(id, done) {
	User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})

passport.use(new FacebookStrategy(config,
 function (req, token, refreshToken, profile, done) {

  const sid = req.cookies[cookieKey]
  const username = profile.displayName + '@facebook'
  if (!sid) {
   let username = profile.displayName + '@facebook'
   User.findOne({username:username}).exec(function(err, user) {
    // New facebook user
    if (users.length === 0) {
     new User({
      username: username,
      authId: profile.id
     }).save(() => {
      new Profile({
       username: username,
       email: 'random@rice.edu',
       zipcode: 77005,
       dob: new Date('1991-09-10'),
       headline: "Welcome facebook user!",
       avatar: 'https://www.facebook.com/images/fb_icon_325x325.png',
       following: []
      }).save()
     });
    }
    return done(null, profile)
   })
  }
  else {
   // Check if the current user is normal logged in, and if so link them
   redis.hgetall(sid, function (err, redis_user) {
    // Obtain redis user from redis hashmap
    const localUser = redis_user.username
    Profile.findOne({ username: username }).exec(function (err, profileData) {
     if (profileData) {
      const old_followers = profileData.following
      Profile.findOne({ username: localUser }).exec(function (err, newProfile) {
       if (newProfile) {
        //merge the follower
        const newFollowersList = newProfile.following.concat(old_followers)
        Profile.update({ username: localUser },
         { $set: { 'following': newFollowersList } },
         function () { })
       }
      })
      //clear the data in the facebook account
      Profile.update({ username: username },
       { $set: { 'following': [] } },
       function () { })
     }
    })
    Article.update({ author: username },
     { $set: { 'author': localUser } },
     { new: true, multi: true }, function () { })
    Article.update({ 'comments.author': username },
     { $set: { 'comments.$.author': localUser } },
     { new: true, multi: true },
     function () { })
    User.findOne({ username: localUser }).exec(function (err, user) {
     if (user) {
      //let authObj = {}
      //authObj[`${profile.provider}`] = profile.displayName
      User.update({ username: localUser },
       { $addToSet: { 'auth': 'facebook' } },
       { new: true },
       function () { })
     }
    })
   })
   return done(null, profile)
  }
 })
)

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
				var obj_user = new User({username:username, salt:salt, hash:hash,auth:'',authId:''})
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
	if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		res.status(200).send("OK")
	}
	else {
		redis.del(req.cookies[cookieKey])
		res.clearCookie(cookieKey)
		res.status(200).send("OK")
	}
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
	if (req.isAuthenticated()) {
		const usrArr = req.user.username.split('@');
		//const authObj = {}
		//authObj[`${usrArr[1]}`] = usrArr[0]
		User.findOne({auth: 'facebook'}).exec(function(err,user) {
			if(!user){
				req.username = req.user.username
			//	console.log(req.user)
			//	console.log(req.user.username)
		} else {
				req.username = user.username
			}
			next()
		})
	} else{
		const sid = req.cookies[cookieKey]
		if (!sid){
	        return res.sendStatus(401)
	    }
	    redis.hgetall(sid, function(err, userObj) {
	    	if(err) throw err;
	    	if(userObj){
	    		console.log(sid + ' mapped to ' + userObj.username)
	    		req.username = userObj.username
				next()
			}
			else{
				res.sendStatus(401)
			}
	    })
	}

}

const success_res = (req, res) => {
	req.session.save(() => {
	res.redirect(hostUrl)
	})
}

const error_res = (err, req, res, next) => {
	if (err) {
			res.status(400);
			res.send({ err: err.message });
	}
}

const location_res = (req, res, next) => {
		if (hostUrl === '') {
		hostUrl = req.headers.referer
		//  console.log(hostUrl)
		}
		next()
}

const FB_disconnect = (req, res) => {
	const username = req.username
	User.findOne({ username: username }).exec(function (err, user) {
	//	console.log('huhu')
	//	console.log(user)
			if (user.auth) {
			User.update({ username: username },
				{ $set: { auth: null,authId:null} },
				{ new: true }, function () {
		//			console.log('i am here')
				res.status(200).send({ result: 'successfully unlink' })
				})
			} else {
		//		console.log('i am not here')
			res.status(400).send("no link account")
			}
	})
}

const FB_connect = (req, res) => {
		const username = req.body.originalUserName;
		const password = req.body.originalPassword;
	//	console.log('346')
//		console.log(req.user)
//		console.log(req.username)
		if (!username || !password) {
			res.status(400).send("Missing Username or Password")
			return
		}
		User.find({ username: username }).exec(function (err, users) {
			if (!users || users.length === 0) {
			res.sendStatus(400)
			return
		}
		const redis_user = users[0]
		if (!redis_user) {
			res.status(400).send("This user has not registered")
		}
		const salt = redis_user.salt;
		const hash = redis_user.hash;

		if (md5(password + salt) === hash) {
				//third party username
				//Update article author name and comment author name
				Article.update({ author: req.username },
					{ $set: { 'author': username } },
					{ new: true, multi: true },
					function () { })
				Article.update({ 'comments.author': req.username },
					{ $set: { 'comments.$.author': username } },
					{ new: true, multi: true }, function () { })
				Profile.findOne({ username: req.username }).exec(function (err, profile) {
					if (profile) {
						const old_followers = profile.following
				//		console.log(old_followers)
				//		console.log(profile)
				//		console.log(username)
						Profile.findOne({ username: username }).exec(function (err, newProfile) {
							if (newProfile) {
							//	console.log(old_followers)
								const newFollowersList = newProfile.following.concat(old_followers)
								Profile.update({ username: username },
									{ $set: { 'following': newFollowersList } },
									function () { })
										}
								})
								//Delete the profile record
								Profile.update({ username: req.username }, {
								$set: {
									'following': []
								}
								}, function () { })
								}
						})
					User.findOne({ username: username }).exec(function (err, user) {
							if (user) {
								const usrArr = req.username.split('@');
							
							//	console.log('402')
						//	console.log(username)
								User.update({ username: username },
								{ $set: { 'auth': 'facebook' } },
								{ new: true }, function () { })
							}
						})
						res.status(200).send({ username: username, result: 'success' })
				} else {
					res.status(401).send("incorrect password!")
				}
				})
}

module.exports = app => {
  	app.use(cookieParser())

	app.use(location_res)
    app.use(session({secret:'thisIsMySecretMessage',resave: false, saveUninitialized: false}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.use('/login/facebook', passport.authenticate('facebook', {scope:'email'}))
//	app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:hostUrl, failureRedirect:'/fail'}, fblogin))
	app.use('/auth/callback', passport.authenticate('facebook', { failureRedirect: '/login/facebook' }), success_res, error_res)
	
	app.post('/login', postLogin)
	app.post('/register', postRegister)
	app.use(isLoggedIn)
	app.use('/link/facebook', passport.authorize('facebook', { scope: 'email' }))
	app.post('/FB_disconnect', FB_disconnect)
	app.post('/FB_connect', FB_connect)
	app.put('/logout', putLogout)
    app.put('/password',putPassword)
  
}