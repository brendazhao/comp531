var Name=document.getElementById("Name");
var alertName=document.getElementById("alertName");
var Namenow=document.getElementById("Namenow");

var Email=document.getElementById("Email");
var alertEmail=document.getElementById("alertEmail");
var Emailnow=document.getElementById("Emailnow");

var Phone=document.getElementById("Phone");
var alertPhone=document.getElementById("alertPhone");
var Phonenow=document.getElementById("Phonenow");

var Zipcode=document.getElementById("Zipcode");
var alertZipcode=document.getElementById("alertZipcode");
var Zipcodenow=document.getElementById("Zipcodenow");

var Pwd=document.getElementById("YourPassword");
var alertPwd=document.getElementById("alertPassword");
var Pwdnow=document.getElementById("YourPasswordnow");

var PwdConf=document.getElementById("PasswordConfirmation");
var alertPwdConf=document.getElementById("alertPasswordConfirmation");
var PwdConfnow=document.getElementById("PasswordConfirmationnow");
function validateInfo(){
	var flag=true;
	//validate accountname
	if(!validate(Name)){
		alertName.innerHTML="You must fill in your account name.\n";
		flag=false;
	}
	else if(!validateAccountName(Name)){
		alertName.innerHTML="Account name can only be upper or lower case letters and numbers, but may not start with a number.\n";
		flag=false;
	}
	//validate email
	if(!validate(Email)){
		alertEmail.innerHTML="You must fill in your e-mail address.\n";
		flag=false;
	}
	else if(!validateEmail(Email)){
		alertEmail.innerHTML="You must fill in your e-mail address in correct form.(x@x.x)\n";
		flag=false;
	}
	//validate phone
	if(!validate(Phone)){
		alertPhone.innerHTML="You must fill in your phone number.\n";
		flag=false;
	}
	else if(!validatePhone(Phone)){
		alertPhone.innerHTML="You should fill in your phone number in correct form.(xxx-xxx-xxxx)\n";
		flag=false;
	}
	//validate zipcode
	if(!validate(Zipcode)){
		alertZipcode.innerHTML="You must fill in your zipcode.\n";
		flag=false;
	}
	else if(!validateZipCode(Zipcode)){
		alertZipcode.innerHTML="You should fill in your ZipCode in correct form.(xxxxx)\n";
		flag=false;
	}
	
	//password
	if(!validate(Pwd)){
		alertPwd.innerHTML="You must fill in your pasword.\n";
		flag=false;
	}
	if(!validate(PwdConf)){
		alertPwdConf.innerHTML="You must fill in your pasword Confirmation.\n";
		flag=false;
	}
	if(!validatePassword(Pwd,PwdConf)){
		alertPwdConf.innerHTML="The password and the password confirmation is not the same!\n";
		flag=false;
	}	

	if(flag){
		changeContent();
	}
	clearContent();	
}
function changeContent(){
	if(Name.value!=Namenow.innerHTML){
		alertName.innerHTML="The name has changed from "+Namenow.innerHTML+" to "+Name.value+"\n";
		Namenow.innerHTML=Name.value;
	}
	if(Email.value!=Emailnow.innerHTML){
		alertEmail.innerHTML="The email has changed from "+EmailNow.innerHTML+" to "+Email.value+"\n";
		Emailnow.innerHTML=Email.value;
	}
	if(Phone.value!=Phonenow.innerHTML){
		alertPhone.innerHTML="The phonenumber has changed from "+Phonenow.innerHTML+" to "+Phone.value+"\n";
		Phonenow.innerHTML=Phone.value;
	}
	if(Zipcode.value!=Zipcodenow.innerHTML){
		alertZipcode.innerHTML="The zipcode has changed from "+Zipcodenow.innerHTML+" to "+Zipcode.value+"\n";
		Zipcodenow.innerHTML=Zipcode.value;
	}
}
function clearContent(){
	Name.value="";
	Email.value="";
	Phone.value="";
	Zipcode.value="";
	Pwd.value="";
	PwdConf.value="";
}
function validate(element){
	if(element.value == ""||element.value == null){
		return false;
	}
	return true;
} 
function validateAccountName(element){
	var reg=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
	if(element.value.match(reg)||!(validate(element))){  
			return true; 
		}
		return false;     
}
function validateEmail(element){
	var reg=/^([a-zA-Z0-9\_\.\-])+\@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})$/;
	if(element.value.match(reg)||(!validate(element))){  
			return true; 
		}
		return false;     
}
function validatePhone(element){
	var reg = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;  
		if(element.value.match(reg)||(!validate(element))){  
			return true; 
		}
		return false;       
}
function validateZipCode(element){
	var reg = /^([0-9]{5})$/;  
		if(element.value.match(reg)||(!validate(element))){  
			return true; 
		}
		return false;   
}
function validatePassword(element1,element2){
	if(element1.value!=element2.value && validate(element1) && validate(element2)){
		return false;
	}
	return true;
}