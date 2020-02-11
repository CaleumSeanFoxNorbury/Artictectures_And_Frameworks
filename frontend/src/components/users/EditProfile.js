import React, { Component } from 'react';
import axios from 'axios';

export default class EditUsers extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

    this.state = {
      username: '',
      email: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/user/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          email: response.data.email
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:3001/user/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email
    }

    console.log(user);

    axios.post('http://localhost:3001/user/edit/' + this.props.match.params.id, user)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Profile</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername} />
        </div>
        <div className="form-group"> 
          <label>Email: </label>
          <input type="text" required className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
        </div>
        <div className="form-group">
          <input type="submit" value="editUser" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}