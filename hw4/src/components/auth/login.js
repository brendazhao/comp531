import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//basic structure of the login module
export const Login = ({addUser,errorMsg, errLogInfo,toMainPage}) => {
    let username;
    let password;
    return(
    <div>
        <h2>Log In</h2>
        <br/>
        <div className="card3">
            <form>
            User Name: &nbsp;&nbsp;
            <input className="inputmsg" type="text" placeholder="your user name" 
                ref={(node)=>username = node} id="Name" />
            <br/><br/>
            Password: &nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="password" 
                ref={(node)=>password = node} id="YourPassword" />
            <br/><br/>

            <input id="login" className="btn" type="submit" value="Login" 
            onClick={(event) => {
                event.preventDefault(),
                getInfo(addUser,errorMsg,toMainPage,username,password)
               }
                }/>
            <input className="btn" type="reset" value="Clear" />
            
           <div className="alertmsg">{errLogInfo}</div>
            </form>
         </div>
    </div>
)}

//get the input info and save it in the state tree and turn to the main page
const getInfo=(addUser,errorMsg,toMainPage,username,password)=>{ 
    var myBirth="2000-01-01"
    if(username.value==''||password.value==''){
        errorMsg("You can't login without username or password!")
    }
    else{
        var user={
            name:username.value,
            email:"",
            phone:"",
            zipcode:"",
            password:password.value,
            birthday:myBirth
        }
        addUser(user)
        toMainPage(user)
    }
}
//check the type
Login.propTypes = {
    addUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.func.isRequired,
    errLogInfo: PropTypes.string.isRequired,
    toMainPage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errLogInfo: state.errLogInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            addUser: (user)=>dispatch({type: 'LOG_IN',user}),
            errorMsg: (errLogInfo)=>dispatch({type: 'IS_LOG_ERROR', errLogInfo}),
            toMainPage: (user)=>dispatch({type: 'TO_MAIN_PAGE'},user)
        }
    }
)(Login)