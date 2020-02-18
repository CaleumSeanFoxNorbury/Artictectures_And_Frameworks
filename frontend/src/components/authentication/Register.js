import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail= this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            email: '',
            password: '',
        }
    } 

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })    
    }

    onSubmit(e){
        e.preventDefault();
        var user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        try{
            axios.post('http://localhost:3001/user/register', user) 
            .then(res => {
                console.log("Data: ", res.data)              
            })
            .catch((error) => {
                console.log(error);
            });

            window.location ='/user/login';
        
        }catch{
            console.log("Error: User has not been created!");
            window.location = '/user/register';
        }           
    }

    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" required className="username" value={this.state.username} onChange={this.onChangeUsername} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" required className="email" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input className="password" type="text" onChange={this.onChangePassword} value={this.state.password} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register" className="btn-btn"></input>
                    </div>
                </form>

                <p>Already have a Account? <a href="/user/login">Login here</a> </p>
            </div>
        )
    }
}