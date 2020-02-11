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
            <Home />
        </div>
        );
    }
}

function Home(){
    const handleOnClickDefault = () => {
        store.addNotification({
            title: "New Document Added",
            message: "User added thr card",
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