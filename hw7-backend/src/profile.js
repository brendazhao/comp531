const uploadImage = require('./uploadCloudinary')
const Profile = require('./model.js').Profile

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadline = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
    Profile.find({username: {$in:users}}).exec(function(err,profiles){
        if(!profiles || profiles.length === 0 ){
            res.status(400).send('all the input users have Not registered')
            return
        }
        var result = []
        profiles.forEach(function(item){
            result.push({username:item.username, headline:item.headline})
        })
        res.status(200).send({headlines:result})
    })
}

const putHeadline = (req, res) => {
	 var user = req.username
    if(!req.body.headline){
        res.status(400).send("missing the headline input")
        return
    }
    Profile.update({username:user},{$set:{headline:req.body.headline}},{new: true}, function(err){
        if(err)
            return console.log(err)
        else{
            Profile.find({username:user}).exec(function(err,profiles){
                if(err)
                    return console.log(err)
                else if(!profiles || profiles.length === 0){
                    res.status(400).send("this user has not registered to the database")
                    return
                }
                else{
                    res.status(200).send({
                    username:user,
                    headline:profiles[0].headline
                    })
                }
            })
        }
    })
}

const getEmail = (req, res) => {
	 var user
    if (!req.params.user) 
        user = req.username
    else
        user =  req.params.user
    Profile.find({username:user}).exec(function(err,profiles){
        if(err)
            return console.log(err)
        else if(!profiles || profiles.length === 0){
            res.status(400).send("this user has not registered to the database")
            return
        }
        else{
            res.status(200).send({username: user, email: profiles[0].email})
        }
    })	

}

const putEmail = (req, res) => {
	console.log(req)
	 if(!req.body.email){
        res.status(400).send("missing email input")
        return
    }
    else{
        var user = req.username
        Profile.update({username:user},{$set:{email:req.body.email}},{new:true}, function(err){
            if(err)
                return console.log(err)
            else{
                Profile.find({username:user}).exec(function(err,profiles){
                if(err)
                    return console.log(err)
                else if(!profiles || profiles.length === 0){
                    res.status(400).send("this user has not registered to the database")
                    return
                }
                else{
                    res.status(200).send({
                    username:user,
                    email:profiles[0].email
                    })
                }
            })
            }
        })
    }
}

const getZipcode = (req, res) => {
 var user
    if (!req.params.user) 
        user = req.username
    else
        user =  req.params.user
    Profile.find({username:user}).exec(function(err,profiles){
        if(err)
            return console.log(err)
        else if(!profiles || profiles.length === 0){
            res.status(400).send("this user has not registered to the database")
            return
        }
        else{
            res.status(200).send({username: user, zipcode: profiles[0].zipcode})
        }
    })  

}

const putZipcode = (req, res) => {
	 if(!req.body.zipcode){
        res.status(400).send("missing zipcode input")
        return
    }
    else{
        var user = req.username
        Profile.update({username:user},{$set:{zipcode:req.body.zipcode}},{new:true}, function(err){
            if(err)
                return console.log(err)
            else{
                Profile.find({username:user}).exec(function(err,profiles){
                if(err)
                    return console.log(err)
                else if(!profiles || profiles.length === 0){
                    res.status(400).send("this user has not registered to the database")
                    return
                }
                else{
                    res.status(200).send({
                    username:user,
                    zipcode:profiles[0].zipcode
                    })
                }
            })
            }
        })
    }
}

//TODO: FIX THIS END-POINT
const getAvatars = (req, res) => {
	var users = req.params.users ? req.params.users.split(',') : [req.username]
    Profile.find({username: {$in:users}}).exec(function(err,profiles){
        if(!profiles || profiles.length === 0 ){
            res.status(400).send('all the input users have Not registered')
            return
        }
        var result = []
        profiles.forEach(function(item){
            result.push({username:item.username, avatar:item.avatar})
        })
        res.status(200).send({avatars:result})
    })
}

const putAvatars = (req, res) => {
	var user = req.username
    if(!req.fileurl){
        res.status(400).send("missing the avatar input")
        return
    }
    Profile.update({username:user},{$set:{avatar:req.fileurl}},{new: true}, function(err){
        if(err)
            return console.log(err)
        else{
            Profile.find({username:user}).exec(function(err,profiles){
                if(err)
                    return console.log(err)
                else if(!profiles  || profiles.length === 0){
                    res.status(400).send("this user has not registered to the database")
                    return
                }
                else{
                    res.status(200).send({
                    username:user,
                    avatar:profiles[0].avatar
                    })
                }
            })
        }
    })
}


const getDob = (req, res) => {
    var user = req.username
    Profile.find({username:user}).exec(function(err,profiles){
        if(err)
            return console.log(err)
        else if(!profiles || profiles.length === 0){
            res.status(400).send("this user has not registered to the database")
            return
        }
        else{
            res.status(200).send({username: user, dob: profiles[0].dob})
        }
    })  
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
     app.put('/avatar', uploadImage('avatar'), putAvatars)
//   app.put('/avatar', uploadImage('avatar'), uploadAvatar)
}