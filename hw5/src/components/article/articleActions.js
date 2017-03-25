import { resource } from '../../actions'
import { initFollowing } from '../main/followingActions'
//init the articles part, clean the original exists articles
export const initArticles = () => {
    return (dispatch) => {
        dispatch({type: 'CLEAN'})
        resource('GET', 'articles')
        .then((response) => {
            dispatch({type: 'UPDATE_ARTICLES', articles: response.articles})
    })
        .catch((error) => console.log(error))
    }
}

//add a new article 
export const addNewArticle = ({text}) => {
    return (dispatch) => {
        resource('POST', 'article', {text})
        .then((response) => {
            dispatch(initArticles())
            dispatch(initFollowing())
        })
        .catch((error) => console.log(error))
    }
}