import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

var id = 4
// this is the basic structure for user's info
const User = ({user, self}) => (
    <div>
        <br/>
        <img src={user.image} />
        <div>{user.name}</div>
        <div><b>{user.status}</b></div>
        <button className='btn' 
            onClick={() => remove(user.id, self)}>Unfollow</button> 
        <br/>
        <br/>
        <br/>
    </div>
)
// this is the class get what we need from the state and 
//build the basic structure for followers with the info
class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {followerList: props.followings}
    }
    render() {
        return(
            <div>
                <h3> Following Users </h3>
                <div>
                    {
                        this.state.followerList.map((user) => {
                            return (
                                <User key={user.id} user={user} self={this}/>
                            )
                        })
                    }
                </div>
                <div>
                    <input id='addFollowing' type='text' className="inputmsg2" 
                        placeholder='Name' /><br/>
                    <button className='btn' 
                        onClick={() => 
                            addFollowing(this)}> Add New Follewer</button>
                </div>
            </div>
        )
    }
}
// add a follower by changing the state 
const addFollowing = (self) => {
    var name = document.getElementById('addFollowing').value 
    if(name !== '') {
        self.setState({
            followerList: [
                ...self.state.followerList,
                {
                    id: id,
                    image:"img/default.jpg",
                    name: name,
                    status:"You are my sunshine!"
                }
            ]
        })
        id++
        document.getElementById('addFollowing').value = ''
    }
}
//remove a follower by changing the state 
const remove = (id, self) => {
    self.setState({
        followerList: self.state.followerList.filter((user) => user.id != id)
    })
}

export default Following