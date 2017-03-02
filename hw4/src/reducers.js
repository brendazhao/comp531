const initialFollowers = require('./data/followers.json')
const initialArticles = require('./data/articles.json')

// init the state and change the state
const Reducer =(state={
	errRegInfo:'',
	errLogInfo:'',
	errUpdateInfo:'',
	headlineInfo:'Never say die!',
	success:'',
	location:'',
	user:{},
	followerList: initialFollowers.following,
	articles: initialArticles.articles
},action)=>{
	switch (action.type){
		case 'TO_OUT':
			return {...state,
					location:"LANDING_PAGE",
					errLogInfo:'',errUpdateInfo:''}
		case 'TO_MAIN_PAGE':
			return {...state,
					location:"MAIN_PAGE"}
		case 'TO_PROFILE_PAGE':
			return {...state,
					location:"PROFILE_PAGE",
					errUpdateInfo:''}
		case 'IS_REG_ERROR':
			return {...state,
					errRegInfo: action.errRegInfo}
		case 'IS_LOG_ERROR':
			return {...state,
					errLogInfo:action.errLogInfo}
		case 'IS_UPDATE_ERROR':
			return {...state,
					errUpdateInfo:action.errUpdateInfo}
		case 'UPDATE_HEADLINE':
			return {...state,
					headlineInfo:action.headlineInfo}
		case 'REGISTER':
			return {...state,
					user: action.user}
		case 'LOG_IN':
			return {...state,
					user: action.user}
		case 'ADD_ARTICLE':
			 return {
                ...state,
                articles: [
                    {
                        author:action.username,
                        text: action.text,
                        timestamp:action.time,
                        picture:action.img
                    },
                    ...state.articles
                ]
            }
		default:
			return state
	}
}
export default Reducer