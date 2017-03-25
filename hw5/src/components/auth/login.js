import React, { Component, PropTypes } from 'react'
import {connect } from 'react-redux'
import {login} from './authActions'
//basic structure of the login module
export const Login = ({errLogInfo,dispatch}) => {
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
                getInfo(username,password,dispatch)
               }
                }/>
            <input className="btn" type="reset" value="Clear" />
            
           <div className="alertmsg">{errLogInfo}</div>
            </form>
         </div>
    </div>
)}

//get the input info and save it in the state tree and turn to the main page
const getInfo=(username,password,dispatch)=>{ 
    const myPhone="123-456-7890"
    if(username.value==''||password.value==''){
        dispatch({type: 'IS_LOG_ERROR', errLogInfo:'You cannot login without username or password!'})
     }
    else{
        const user={
            name:username.value,
            phone:myPhone,
            password:password.value
        }
        dispatch(login({user}))

    }
}
//check the type
Login.propTypes = {
    errLogInfo: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}
export default connect(
    (state) => {
        return {
            errLogInfo: state.errLogInfo,
            user: state.user
        }
    },null
)(Login)