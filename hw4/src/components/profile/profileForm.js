import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Avator from './avator'
//basic structure of the profilw form
export const ProfileForm = ({addUser,errorMsg, errUpdateInfo,user}) => {
    let name;
    let email;
    let phone;
    let zipcode;
    let pw1;
    let pw2;
    let birthday;
    return(
    <div className="main">
        <h1>Welcome to Profile Page</h1>
        <div className="card3">
            <form>
            <Avator/>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="your user name" 
                                            ref={(node)=>name = node} id="Name" />
                <span id="Namenow">{user.name}</span>    
                <br/>
                <br/>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="xxx@xxx.xxx" 
                                            ref={(node)=>email = node} id="Email" />
                <span id="Emailnow">{user.email}</span>    
                <br/>
                <br/>
                Birthday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" defaultValue={user.birthday} 
                                            ref={(node)=>birthday = node} id="Birthday" />
                <br/>
                <br/>
                Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="xxx-xxx-xxxx" 
                                            ref={(node)=>phone = node} id="Phone" />
                <span id="Phonenow">{user.phone}</span>      
                <br/>
                <br/>
                Zipcode:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="xxxxx" 
                                            ref={(node)=>zipcode = node} id="Zipcode" />
                <span id="Zipcodenow">{user.zipcode}</span>    
                <br/>
                <br/>
                Password:&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="password" ref={(node)=>pw1 = node} 
                                            id="YourPassword" />
                <br/>
                <br/>
                PW Confirm:&nbsp;
                <input className="inputmsg" type="password" ref={(node)=>pw2 = node} 
                                            id="PasswordConfirmation" />
                <br/>
                <br/>
                <br/>
                <br/>
                <input id="update" className="btn" type="submit" value="Update" 
                onClick={(event) => 
                    {event.preventDefault();
                    validateInfo(addUser,errorMsg,pw1,pw2,name,
                                            email,phone,zipcode,birthday,user)}
                    }/>
                <input className="btn" type="reset" value="Clear"/>
                <div className="alertmsg">{errUpdateInfo}</div>
            </form>
        </div>
    </div>
)
}
//validate the info user input
const validateInfo=(addUser,errorMsg,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user)=>{
    var flag=true;
    var str="";
    errorMsg("")
    //validate accountname
    if(!validateAccountName(Name)){
        str+="Name can only consist with upper/lower letters/numbers and cannot start with a number. ";
        flag=false;
    }
    //validate email
    if(!validateEmail(Email)){
        str+="You must fill in your e-mail address in correct form.(x@x.x)";
        flag=false;
    }
    if(!validatePhone(Phone)){
        str+="You must fill in your phone number in correct form.(xxx-xxx-xxxx)";
        flag=false;
    }
    //validate zipcode
    if(!validateZipCode(Zipcode)){
        str+="You must fill in your ZipCode in correct form.(xxxxx)";
        flag=false;
    }
    
    //password
    if(!validatePassword(Pw1,Pw2)){
        str+="Two password are not the same!";
        flag=false;
    }   

    if(flag){
        if (IsNotchanged(user,Name,Email,Phone,Zipcode,Pw1,Pw2))
            errorMsg("You have changed nothing! Please update any item(except DOB)")
        else{
            addthisOne(addUser,errorMsg,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user);
            errorMsg("You have update!")
            }
    }
    else{
        errorMsg(str);
    }
}
//check if anything have changed
const IsNotchanged=(user,Name,Email,Phone,Zipcode,Pw1,Pw2)=>{
    if((Name.value==""||Name.value==user.name) 
        && (Email.value==""||Email==null||Email.value==user.email) 
        && (Phone.value==""||Phone==null||Phone.value==user.phone) 
        && (Zipcode.value==""||Zipcode==null||Zipcode.value==user.zipcode) 
        && (Pw1.value==""||Pw1.value==user.password) 
        && (Pw2.value==""||Pw2.value==user.password))
        return true;
    else
        return false
}
// add the changed info in to the state
const addthisOne=(addUser,errorMsg,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user)=>{
    var myName;
    var myEmail;
    var myPhone;
    var myZipcode;
    var myPassword;
    var myBirth;
    if(Name.value!="")  {   myName=Name.value;  }
    else    {   myName=user.name;    }
    if(Email.value!="")  {   myEmail=Email.value;  }
    else    {   myEmail=user.email;    }
    if(Phone.value!="")  {   myPhone=Phone.value;  }
    else    {   myPhone=user.phone;    }
    if(Zipcode.value!="")  {   myZipcode=Zipcode.value;  }
    else    {   myZipcode=user.zipcode;    }
    if(Pw1.value!="")  {   myPassword=Pw1.value;  }
    else    {   myPassword=user.password;    }
    myBirth=user.birthday;
    var user={
                name:myName,
                email:myEmail,
                phone:myPhone,
                zipcode:myZipcode,
                password:myPassword,
                birthday:myBirth
            }
    addUser(user)
}
//validate the name by using regular expression
const validateAccountName=(element)=>{
    var reg=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
    if(element==null||element.value==""||element.value.match(reg)){  
            return true; 
        }
        return false;     
}
//validate the email by using regular expression
const validateEmail=(element)=>{
    var reg=/^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/;
    if(element==null||element.value==""||element.value.match(reg)){  
            return true; 
        }
        return false;     
}
//validate the phone by using regular expression
const validatePhone=(element)=>{
    var reg = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;  
        if(element==null||element.value==""||element.value.match(reg)){  
            return true; 
        }
        return false;       
}
//validate the zipcode by using regular expression
const validateZipCode=(element)=>{
    var reg = /^([0-9]{5})$/;  
        if(element==null||element.value==""||element.value.match(reg)){  
            return true; 
        }
        return false;   
}
//validate the password 
const validatePassword=(element1,element2)=>{
    if((element1==null&&element2==null) ||(element1.value=="" && element2.value=="")){
        return true;
    }
    if(element1.value!=element2.value){
        return false;
    }
    return true;
}
//check the type
ProfileForm.propTypes = {
    addUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.func.isRequired,
    errUpdateInfo: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errUpdateInfo: state.errUpdateInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            addUser: (user)=>
                        dispatch({type: 'REGISTER',user}),
            errorMsg: (errUpdateInfo)=>
                        dispatch({type: 'IS_UPDATE_ERROR', errUpdateInfo})
        }
    }
)(ProfileForm)