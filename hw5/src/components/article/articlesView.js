import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

//the basic sturcture for each piece of article
const Card = ({article, index, user}) => (
    <tbody>
        <tr>
            <td className="card3">
                <div className="note">{article.author} said on {article.date}</div>
                <div> { article.text } </div>
                <br/>
                <button type='button' className='btn' data-toggle='collapse'
                        data-target={'#collapseComments' + index}>Comment({article.comments.length})</button>
                <button type='button' className='btn' >Edit</button> 
                <br/><br/>
                 { article.comments.length > 0 ? (
                <ul className='collapse' id={'collapseComments' + index}>
                        { article.comments.map((comment, index) => {
                            return (
                                <li key={index} className="card4">
                                    { comment.author }:  {comment.text}
                                </li>
                            )
                        })}
                    </ul>
                ) : (
                null
            )}
            </td>
            {(article.picture === ""||article.picture===null) ? (
                <td className="card3">No img</td>
            ) : (
                <td className="card3"><img src={article.picture} /></td>
            )}
        </tr>
    </tbody>
)

// this is the class get what we need from the state and build the basic structure for article with the info
export const ArticlesView = ({articlesFilt, resumeArticles, filterArticles}) => (
            <div>
                <div className='card3'>
                    <input id="yourFeed"className="inputmsg" type="text" 
                            placeholder="search you feed" 
                            onChange={(event) => dosearch(event, resumeArticles, filterArticles)}/>
                </div>
                <div className='articlesView'>
                    <table>
                        {
                            articlesFilt.map((article, index, user) => {
                                return (
                                    <Card key={index} article={article} 
                                          index={index} user={user}/>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
)


//filter the article according to the input of the user
const dosearch = (event, resumeArticles, filterArticles) => {
    var keyWord = document.getElementById('yourFeed').value
    if(keyWord === ""||keyWord==null) {
        resumeArticles()
    } else {
       filterArticles(keyWord)
    }
    
}
export default connect(
    (state) => {
        return {
            articlesFilt:state.articlesFilt,
            user : state.user
        }
    },  
    (dispatch) => {
        return {
            resumeArticles: () => dispatch({type: 'RESUME_ARTICLES'}),
            filterArticles: (keyWord) => dispatch({type: 'FILTER_ARTICLES', keyWord: keyWord})
        }
    }
)(ArticlesView)