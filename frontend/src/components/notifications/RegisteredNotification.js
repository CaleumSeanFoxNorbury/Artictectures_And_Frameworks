import React from 'react';
import ReactNotification from 'react-notifications-component';
import { store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';

export default class Notifications extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            top: 1
        };
    }

    render(){
        return(
        <div>
            <ReactNotification />
            <RegisteredNotification />
        </div>
        );
    }
}

function RegisteredNotification(){
    const handleOnClickDefault = () => {
        store.addNotification({
            title: "New User Registered",
            message: "Status: User has been added",
            type: "success",
            container: "top-right",
            indert:"top",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss:{
                duration: 2000,
                showIcon: true
            }
        })
    }
    return(
        <button onClick={handleOnClickDefault}>
            Show Notification
        </button>
    )
}