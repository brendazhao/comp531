import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
//basic sturcture for avator
export const Avator = () => (
    <div>
    	<img src='img/myself.jpg'/>
    	<br/>
    	<input className="inputmsg" type="file"/> 
    	<br/><br/><br/>
    </div>
)

export default connect(
)(Avator)