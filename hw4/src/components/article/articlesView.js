import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const articlesInfo = require('../../data/articles.json')
const articles = articlesInfo.articles
//the basic sturcture for each piece of article
const Card = ({article, index, user}) => (
    <tbody>
        <tr>
            <td className="card3">
                <div className="note">{article.author} said on {article.timestamp}</div>
                <div> { article.text } </div>
                <br/>
                <button type='button' className='btn'>Comment</button>
                <button type='button' className='btn'>Edit</button> 
                <br/><br/>
            </td>
            {article.picture == "" ? (
                <td className="card3"></td>
            ) : (
                <td className="card3"><img src={article.picture} /></td>
            )}
        </tr>
    </tbody>
)

// this is the class get what we need from the state and build the basic structure for article with the info
class ArticlesView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {articles: props.articles, articlesFilt: props.articles}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            articles: nextProps.articles,
            articlesFilt: nextProps.articles
        })
    }

    render() {
        return(
            <div>
                <div className='card3'>
                    <input id="yourFeed"className="inputmsg" type="text" 
                            placeholder="search you feed" 
                            onChange={() => dosearch(this)}/>
                </div>
                <div className='articlesView'>
                    <table>
                        {
                            this.state.articlesFilt.map((article, index, user) => {
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
    }
}

//filter the article according to the input of the user
const dosearch = (self) => {
    var keyWord = document.getElementById('yourFeed').value
    if(keyWord === "") {
        self.setState({
            ...self.state,
            articlesFilt: self.state.articles
        })
    } else {
        self.setState({
            ...self.state,
            articlesFilt: self.state.articles.filter((article) => {
                if(article.author.indexOf(keyWord) == -1 
                    && article.text.indexOf(keyWord) == -1) {
                    return false;
                }
                return true;
            })
        })   
    }
    
}
export default connect(
    (state) => {
        return {
            articles: state.articles,
            user : state.user
        }
    },  
    (dispatch) => {
        return {
           
        }
    }
)(ArticlesView)