import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateProfile } from './profileFormActions'
//basic structure of the profilw form
export const ProfileForm = ({dispatch,errProfileInfo,user}) => {
    let name,email, phone, zipcode, pw1, pw2,birthday;
    return(
    <div className="main">
        <h1>Welcome to Profile Page</h1>
        <div className="card3">
            <form>
                <div>
                    <img src={user.avatar}/>
                    <input type="file" className='btn' id='uploading'/> 
                    <br/><br/><br/>
                </div>
                Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" defaultValue={user.name} readOnly
                                            ref={(node)=>name = node} id="Name" />
                <br/>
                <br/>
                Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="xxx@xxx.xxx" 
                                            ref={(node)=>email = node} id="Email" />
                <span id="Emailnow">{user.email}</span>    
                <br/>
                <br/>
                Birthday:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" defaultValue={user.dob} readOnly
                                            ref={(node)=>birthday = node} id="Birthday" />
                <br/>
                <br/>
                Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input className="inputmsg" type="text" placeholder="xxx-xxx-xxxx" defaultValue={user.phone} readOnly
                                            ref={(node)=>phone = node} id="Phone" />  
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
                    validateInfo(dispatch,pw1,pw2,name,
                                            email,phone,zipcode,birthday,user)}
                    }/>
                <input className="btn" type="reset" value="Clear"/>
                <div className="alertmsg">{errProfileInfo}</div>
            </form>
        </div>
    </div>
)
}
//validate the info user input
const validateInfo=(dispatch,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user)=>{
    var flag=true;
    var str="";
     dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:str})  
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
        if (IsNotchanged(user,Name,Email,Phone,Zipcode,Pw1,Pw2)){
             dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:'You have changed nothing! Please update any item(except DOB)'})
        }
        else{
              addthisOne(dispatch,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user);
              dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:'You have updated!'})
        }
    }
    else{
          dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:str})
    }
}
//check if anything have changed
const IsNotchanged=(user,Name,Email,Phone,Zipcode,Pw1,Pw2)=>{
    if((Email.value===""||Email===null||Email.value===user.email) 
        && (Zipcode.value===""||Zipcode===null||Zipcode.value===user.zipcode) 
        && (Pw1.value===""||Pw1===null||Pw1.value===user.password) 
        && (Pw2.value===""||Pw2===null||Pw2.value===user.password))
        return true;
    else
        return false
}
// add the changed info in to the state
const addthisOne=(dispatch,Pw1,Pw2,Name,Email,Phone,Zipcode,Birthday,user)=>{
    let myName;
    let myEmail;
    let myPhone;
    let  myZipcode;
    let myPassword;
    let  myBirth;
    myName=user.name; 
    if(Email.value!="")  {   myEmail=Email.value;  }
    else    {   myEmail=user.email;    }
    myPhone=user.phone;  
    if(Zipcode.value!="")  {   myZipcode=Zipcode.value;  }
    else    {   myZipcode=user.zipcode;    }
    if(Pw1.value!="")  {   myPassword=Pw1.value;  }
    else    {   myPassword=user.password;    }
   myBirth=user.birthday;
    var newuser={
           //     username, email, dob, zipcode, password
                name:myName,
                email:myEmail,
                zipcode:myZipcode,
                password:myPassword,
            }
    dispatch(updateProfile({newuser}));
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
    errProfileInfo: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errProfileInfo: state.errProfileInfo,
            user: state.user
        }
    }, null
)(ProfileForm)