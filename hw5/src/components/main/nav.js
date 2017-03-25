import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//basic structure of the nav bar
export const Nav = ({location,dispatch,user,logout}) => {
    let headline;
    return(
     <div className="navbar">
        <input id="goProfile" className="btn" type="submit" value="Edit Profile" 
        onClick={(event) => 
                {event.preventDefault();
                goProfile(location,dispatch,user)}
                }/>
        <input id="goLanding" className="btn" type="submit" value="Log Out" 
        onClick={(event) => 
                {event.preventDefault();
                goLanding(location,dispatch,logout)}
                }/>
        <br/>
    </div>
)
}
//go to the profile page
const goProfile=(location,dispatch,user)=>{
 //   location='PROFILE_PAGE'
    dispatch({type: 'TO_PROFILE_PAGE'}, user)
    dispatch({type: 'IS_PROFILE_ERROR', errProfileInfo:''})
}
//go to the landing page
const goLanding=(location,dispatch,logout)=>{
  //  location='LANDING_PAGE';
    logout();
    dispatch({type: 'IS_LOG_ERROR', errLogInfo:''})
    dispatch({type: 'IS_REG_ERROR', errRegInfo:''})
}
//check the type
Nav.propTypes = {
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            location:state.location,
            user: state.user
        }
    },
     (dispatch) => {
        return {
          logout: () => dispatch({type: 'TO_OUT'}),
          dispatch:dispatch
        }
     }
)(Nav)