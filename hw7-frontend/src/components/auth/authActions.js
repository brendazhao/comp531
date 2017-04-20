import { resource } from '../../actions'
import { initArticles } from '../article/articleActions'
import { initFollowing } from '../main/followingActions'
import { initProfile } from '../profile/profileFormActions'
//init all the part;articles, following and profile
export const init = ({user}) => {
    return (dispatch) => {
        resource('GET', 'headlines')
        .then((response) => {
            dispatch({type: 'TO_MAIN_PAGE'},user)
            dispatch({type: 'UPDATE_HEADLINE', username: response.headlines[0].username, 
                headline: response.headlines[0].headline})
             dispatch(initArticles())
             dispatch(initFollowing())
             dispatch(initProfile())
        })
    }
}
//login part
export const login = ({user}) => {
    const username=user.name;
    const password=user.password;
    return (dispatch) => {
        resource('POST', 'login', {username, password})
        .then((response) => {
            dispatch({type: 'IS_LOG_ERROR', errLogInfo:'Finish login!'})
            dispatch({type: 'LOG_IN',user})
            dispatch(init(user))
        })        
        .catch((error) => {
            dispatch({type: 'IS_LOG_ERROR', errLogInfo:'Error log in as '+user.name+'!'})
        })
    }
}
//register part
export const register = ({user}) => {
    return (dispatch) => {
        resource('POST', 'register', user)
        .then((response) => {
      //   dispatch({type: 'REGISTER',user})
            dispatch({type: 'IS_REG_ERROR', errRegInfo:'Finish register!'})
        })
        .catch((error) => {
            console.log(error)
            dispatch({type: 'IS_REG_ERROR', errRegInfo:'Error register in as '+user.username+'!'})
        })
    }
}
//log out part
export const logout = () => {
    return (dispatch) => {
       resource('PUT', 'logout') 
       .then((response) => {
           dispatch({type: 'TO_OUT'})
       })
       .catch((error) => {
       console.log(error)
       })
    }
}