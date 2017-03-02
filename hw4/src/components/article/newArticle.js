import React from 'react'
import {connect} from 'react-redux'

//Add a new article which the contents are from the textarea.
const NewArticle = ({addNew,user}) => {
    return(
        <div className='card3'>
            Type a new Article....<br/><br/>
            <textarea className="inputmsg" cols="40" rows='8' id='newArticle' 
                                            placeholder='Share something interesting!'/>
            <br/><br/>
            Select Picture:&nbsp;&nbsp;
            <input className='btn' type='file' id="uploadimg"/>
            <br/><br/>
            <button type='button' className='btn' onClick={() => { 
                let time=new Date().toLocaleString()
                var img=getPicture(document.getElementById("uploadimg"))
                addNew(user.name,document.getElementById('newArticle').value,time,img)
                document.getElementById("newArticle").value=''
            }}>Post</button>
            <button type='button' className='btn' onClick={() => {
                 document.getElementById('newArticle').value = ''}
            }>Clear</button>
        </div>
    )
}

//Get the picture user have uploaded
const getPicture=(img)=>{
    var $file = $("#uploadimg");
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    if(fileObj && fileObj.files && fileObj.files[0]){
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
    }else{
        dataURL = $file.val();
    }
    return dataURL;
}

export default connect( 
    (state) => {
        return {
            user : state.user
        }
    }, 
    (dispatch) => {
        return {
            addNew: (username,text,time,img) => 
                    dispatch({type: 'ADD_ARTICLE',username, text, time,img})
        }
    }
)(NewArticle)