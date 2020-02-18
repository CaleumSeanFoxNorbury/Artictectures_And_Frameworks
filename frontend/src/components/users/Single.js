import React, { Component } from 'react';
import axios from 'axios';

export default class UserProfileSingle extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAccountType = this.onChangeAccountType.bind(this);
        this.onChangeJoinedDate = this.onChangeJoinedDate.bind(this);
        this.onChangeAuthenticationToken =this.onChangeAuthenticationToken.bind(this);
        this.state = {
            username: this.props.match.params,
            email: '',
            accountType: '',
            joinedDate: '',
            authenticationToken: ''
        };
    }

    onChangeEmail(email){
        this.setState({
            email: email
        })
    }

    onChangeAccountType(type){
        this.setState({
            accountType: type
        })
    }

    onChangeJoinedDate(date){
        this.setState({
            joinedDate: date
        })
    }

    onChangeAuthenticationToken(token){
        this.setState({
            authenticationToken: token
        })
    }

    componentDidMount(){
        const username = {
            username: this.state.username
        }
        
        axios.post('http://localhost:3001/user/profile/:username', username)
        .then(response => {
            this.onChangeEmail(response.data.email);
            this.onChangeAccountType(response.data.accountType);
            this.onChangeJoinedDate(response.data.dateCreated);
            this.onChangeAuthenticationToken(response.data.authenticationToken);
        })
        .catch((error) => {
            console.log(error);
        })
    }

  render() {
    var {username} = this.state.username;

    if(!this.state.authenticationToken){
        return(
            <div>
                <h1>A user by the username provided, doesn't exsist!</h1>
                <br></br>
                <p>Please go back!</p>
            </div>
        )
    }else{
        return(
            <div>
                <h1>{username}'s profile</h1>
                
                <p>Username: {username}</p>
                <p>Email: {this.state.email}</p>
                <p>Date Created: {this.state.joinedDate}</p>
                <p>Account type: {this.state.accountType}</p>
            </div>
        )
    }
  }
}

