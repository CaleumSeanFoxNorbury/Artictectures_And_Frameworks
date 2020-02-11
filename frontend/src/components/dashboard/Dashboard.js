import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Notifcations from '../notifications/notifications'

export default class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            Data: [],
            isLoaded: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3001/', {
            credentials: 'include'
        })
        .then(req => {
            this.setState({ 
                Data: req.data,
                isLoaded: true
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }    
    
    render(){
        var {isLoaded} = this.state;
            
        var signedIn = this.state.Data.SessionStatus;

        if(signedIn === false){
            return(
                <div> 
                    {/* This is used to redirect when not logged in. Due to the 
                    session issue, this has been defaulted to not be reached until
                    sessions have been fixed. | Unreachable */}
                    <Redirect to="user/login" />
                   
                </div>
            )
        }else if(!isLoaded){
            return(
                    <div>Loading...</div>
            );
        } else {
            return(                    
                <div>
                    <h1>Welcome to your Dashboard</h1>
                    <Notifcations />
                </div>
            )
        }
    }
}
