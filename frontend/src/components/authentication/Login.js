import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    } 

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })    
    }

    onSubmit(e){
        e.preventDefault();
        var session = {
            username: this.state.username,
            password: this.state.password,
        }

        try{
            axios.post('http://localhost:3001/user/login',session,{
                credentials: 'include'
            })
            .then(res => {
                console.log("Data: ", res.data)
            })
            .catch((error) => {
                console.log(error);
            });

            window.location ='/';
        
        }catch{
            window.location = '/user/login';
        }           
    }

    render(){
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="username" value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input className="password" type="text" onChange={this.onChangePassword} value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="login" className="btn-btn"></input>
                    </div>
                </form>


                <p>Don't have an Account? <a href="/user/register">Register here</a> </p>
            </div>
        )
    }
}