import React, { Component } from 'react';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);

    //this.deleteUser = this.deleteUser.bind(this)
    this.onChangeUsername = this.onChangeUsername.bind(this)

    this.state = {
      username: '',
    };
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return(
      <div>
        <h3>Welcome to your profile</h3>
        <br></br>
        <p>Due to a problem with the system, please enter your username to view your profile:</p>
        <div className="form-group">
          <label>User: </label>
          <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
        </div>
        <a class="props-link" href={"/user/profile/" + this.state.username}><td>Search User</td></a>
      </div>
    )
  }
}