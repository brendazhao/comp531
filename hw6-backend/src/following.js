const followinglist = {
    following:{
        'qz25':['yy55','sq6'],
        'yy55':['sq6'],
        'sq6':['yy55', 'qz25']
    }
}

const getFollowing = (req, res) =>{
    if (!req.user) req.user = 'qz25'
    const user = req.params.user ? req.params.user : req.user
    res.send({
        username: user,
        following: followinglist.following[user]
    })
}

const putFollowing = (req, res) =>{
    if (!req.user) req.user = 'qz25'
    if (followinglist.following[req.user].indexOf(req.params.user) == -1){
        followinglist.following[req.user].push(req.params.user)
    }
    res.send({
        username: req.user,
        following: followinglist.following[req.user]
    })
}

const deleteFollowing = (req, res)=>{
    if (!req.user) req.user = 'qz25'
    const newfollowing = followinglist.following[req.user].filter((v)=>{
        return v != req.params.user
    })
    followinglist.following[req.user] = newfollowing
    res.send({
        username: req.user,
        following: followinglist.following[req.user]
    })
}

module.exports = app => {
    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}