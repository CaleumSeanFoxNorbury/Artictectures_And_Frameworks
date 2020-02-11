import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this)

    this.state = {
      user: '',
      email: '',
      accountType: '',
      dateJoined: ''
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3001/user/')
    .then(response => {
      this.setState({ 
        user: response.data.user
      })
      var {user} = this.state;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }
   
  deleteUser(id) {
    axios.delete('http://localhost:3001/user/profile/'+id)
      .then(response => { console.log(response.data)} );

    this.setState({
      users: this.state.user.filter(el => el._id !== id)
    })
  }

  // UserProfile() {
  //   return this.state.user.map(currentUser => {
  //     return <Profile user={currentUser} deleteUser={this.deleteUser} key={currentUser._id}/>;
  //   })
  // <p>Username: {this.state.user}</p>
  // <p>Email: {this.state.user.email}</p>
  // <p>Account Type: {this.state.user.accountType}</p>
  // <p>Date Joined: {this.state.user.date}</p>
  // }

  render() {
    return (
      <div>
        <h3>Welcome to your profile</h3>
        <br></br>
      </div>
    )
  }
}