import React from 'react'
import {connect} from 'react-redux'
import { addNewArticle } from './articleActions'

//Add a new article which the contents are from the textarea.
const NewArticle = ({user,dispatch}) => {
    return(
        <div className='card3'>
            Type a new Article....<br/><br/>
            <textarea className="inputmsg" cols="40" rows='8' id='newArticle' 
                                            placeholder='Share something interesting!'/>
            <br/><br/>
            Select Picture:
            <input className='btn' type='file' id="uploading"/>
            <br/><br/>
            <button type='button' className='btn' onClick={() => { 
                var img=getPicture(document.getElementById("uploadimg"))
                dispatch(addNewArticle({text: document.getElementById('newArticle').value}))     
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
    }, null
)(NewArticle)