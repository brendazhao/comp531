import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'
// init the following
export const initFollowing = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAN'})
        resource('GET', 'following')
        .then((response) => {
                response.following.map(function(user)  {
                dispatch(displayFollowing(user))         
            }) 
        })
        .catch((error) => console.log(error))
    }
}
//add a correct following
export const addFollowing = (name) => {
    return (dispatch) => {
        resource('PUT', 'following/' + name)
        .then((response) => {
            if(response.following.indexOf(name) < 0){
                dispatch({type:'IS_UPDATE_ERROR',errUpdateInfo:'Name is not exists!'})
            }
            else{
                dispatch(initFollowing())
                dispatch(initArticles())
            }
        })   
         .catch((error) => console.log(error))  
    }
}
//remove a following
export const removeFollowing = (name) => {
    return (dispatch) => {
        resource('DELETE', 'following/' + name)
        .then((response) => {
            dispatch(initFollowing())
            dispatch(initArticles())
        })
    }
}
//show all the following
const displayFollowing = (name) => {
    return (dispatch) =>{
        const follower = {
            username: name
        }
        const avatarPromise = resource('GET', 'avatars/' + name)
        .then((response) => follower.avatar = response.avatars[0].avatar)
        const headlinePromise = resource('GET', 'headlines/' + name)
        .then((response) => follower.headline = response.headlines[0].headline)
        Promise.all([avatarPromise, headlinePromise] ).then(() => {
            dispatch({ type:'ADD_FOLLOWING', followerList: follower })
        })    
    }
}

