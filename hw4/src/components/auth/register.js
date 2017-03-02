import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//basic structure for register module
export const Register = ({addUser,errorMsg, errRegInfo,toMainPage}) => {
    let name;
    let email;
    let phone;
    let zipcode;
    let pw1;
    let pw2;
    let birthday;
    return(
    <div>
        <h2>Register</h2>
        <div className="card3">
            <form>
            Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="text" placeholder="your user name" 
                ref={(node)=>name = node} id="Name"/>
            <br/>
            <br/>
            Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="text" placeholder="xxx@xxx.xxx" 
                ref={(node)=>email = node} id="Email" />
            <br/>
            <br/>
            Birthday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="date" 
                ref={(node)=>birthday = node} id="Birthday" />
            <br/>
            <br/>
            Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="text" placeholder="xxx-xxx-xxxx" 
                ref={(node)=>phone = node} id="Phone" />
            <br/>
            <br/>
            Zipcode:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="text" placeholder="xxxxx" 
                ref={(node)=>zipcode = node} id="Zipcode" />
            <br/>
            <br/>
            Password:&nbsp;&nbsp;&nbsp;&nbsp;
            <input className="inputmsg" type="password" 
                ref={(node)=>pw1 = node} id="YourPassword" />
            <br/>
            <br/>
            PW Confirm:&nbsp;
            <input className="inputmsg" type="password" 
                ref={(node)=>pw2 = node} id="PasswordConfirmation" />
            <br/>
            <br/>
            <input id="login" className="btn" type="submit" value="Register" 
            onClick={(event) => 
                {event.preventDefault();
                validateInfo(addUser,errorMsg,toMainPage,
                        pw1,pw2,name,email,phone,zipcode,birthday)}
                }/>
            <input className="btn" type="reset" value="Clear"/>
            <div className="alertmsg">{errRegInfo}</div>
            </form>
        </div>
    </div>
)
}
//validate the input information
const validateInfo=(addUser,errorMsg,toMainPage,Pw1,Pw2,
                        Name,Email,Phone,Zipcode,Birthday)=>{
    var flag=true;
    var str="Alert: "
    var errorNum=0
    errorMsg("")
    //validate accountname
    if(!validate(Name)){
        str+="You must fill in your name.";
        flag=false;
    }
    else if(!validateAccountName(Name)){
        str+="Name can only consist with upper/lower letters/numbers and cannot start with a number. ";
        flag=false;
    }
    //validate email
    if(!validate(Email)){
        str+="You must fill in your e-mail address.";
        flag=false;
    }
    else if(!validateEmail(Email)){
        str+="You must fill in your e-mail address in correct form.(x@x.x) ";
        flag=false;
    }
    if(!validate(Birthday)){
        str+="You must fill in your Birthday. ";
        flag=false;
    }
    //validate phone
    if(!validate(Phone)){
        str+="You must fill in your phone number. ";
        flag=false;
    }
    else if(!validatePhone(Phone)){
        str+="You must fill in your phone number in correct form.(xxx-xxx-xxxx) ";
        flag=false;
    }
    //validate zipcode
    if(!validate(Zipcode)){
        str+="You must fill in your zipcode. ";
        flag=false;
    }
    else if(!validateZipCode(Zipcode)){
        str+="You must fill in your ZipCode in correct form.(xxxxx) ";
        flag=false;
    }
    
    //password
    if(!validate(Pw1)){
        str+="You must fill in your pasword. ";
        flag=false;
    }
    if(!validate(Pw2)){
        str+="You must fill in your pasword Confirmation. ";
        flag=false;
    }
    if(!validatePassword(Pw1,Pw2)){
        str+="Two passwords are not the same. ";
        flag=false;
    }   

    if(flag){
        addthisOne(addUser,errorMsg,toMainPage,Pw1,Pw2,
                Name,Email,Phone,Zipcode,Birthday);
    }
    else{
        errorMsg(str);
    }
}
//validate if the element exists
const validate=(element)=>{
    if(element.value == ""||element.value == null){
        return false;
    }
    return true;
} 
//add this to the state tree and turn to the main page
const addthisOne=(addUser,errorMsg,toMainPage,Pw1,Pw2,
        Name,Email,Phone,Zipcode,Birthday)=>{
    var user={
                name:Name.value,
                email:Email.value,
                phone:Phone.value,
                zipcode:Zipcode.value,
                password:Pw1.value,
                birthday:Birthday.value
            }
    addUser(user)
    toMainPage(user)
}
//validate the name by regular expression
const validateAccountName=(element)=>{
    var reg=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
    if(element.value.match(reg)||!(validate(element))){  
            return true; 
        }
        return false;     
}
//validate the email by regular expression
const validateEmail=(element)=>{
    var reg=/^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/;
    if(element.value.match(reg)||(!validate(element))){  
            return true; 
        }
        return false;     
}
//validate the phone by regular expression
const validatePhone=(element)=>{
    var reg = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;  
        if(element.value.match(reg)||(!validate(element))){  
            return true; 
        }
        return false;       
}
//validate the zipcode by regular expression
const validateZipCode=(element)=>{
    var reg = /^([0-9]{5})$/;  
        if(element.value.match(reg)||(!validate(element))){  
            return true; 
        }
        return false;   
}
//validate the password by regular expression
const validatePassword=(element1,element2)=>{
    if(element1.value!=element2.value 
        && validate(element1) && validate(element2)){
        return false;
    }
    return true;
}
//check the type
Register.propTypes = {
    addUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.func.isRequired,
    errRegInfo: PropTypes.string.isRequired,
    toMainPage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errRegInfo: state.errRegInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            addUser: (user)=>
                dispatch({type: 'REGISTER',user}),
            errorMsg: (errRegInfo)=>
                dispatch({type: 'IS_REG_ERROR', errRegInfo}),
            toMainPage: (user)=>
                dispatch({type: 'TO_MAIN_PAGE'},user)
        }
    }
)(Register)