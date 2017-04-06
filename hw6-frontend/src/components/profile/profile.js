import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './profileform'
//basic structure for profile
export const Profile = ({location,dispatch,user}) => {
    let headline;
    return(
    <div>
         <div className="navbar">
            <input id="goMain" className="btn" type="submit" 
            value="Back to Main Page" onClick={(event) => 
                    {event.preventDefault();
                    goMain(location,dispatch,user)}
                    }/>
            <br/>
        </div>
        <ProfileForm/>
    </div>
)
}
// go to the main page
const goMain=(location,dispatch,user)=>{
  dispatch({type: 'TO_MAIN_PAGE'},user)
  dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:''})
  dispatch({type: 'IS_UPDATE_ERROR',errUpdateInfo:''})
}
// check the type
Profile.propTypes = {
    location: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            location:state.location,
            user: state.user
        }
    },null
)(Profile)