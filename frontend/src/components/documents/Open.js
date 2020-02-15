import React, { Component } from 'react';
import axios from 'axios';
import './css/DocumentStyles.css';

export default class OpenDocument extends Component{
    constructor(props){
        super(props);

        this.openDocument = this.openDocument.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeOpenedBy = this.onChangeOpenedBy.bind(this);

        this.state = {
            documentTitle: this.props.match.params,
            openedBy: ''
        };
    }
   
   onChangeTitle(documentTitle){
        this.setState({
            documentTitle: documentTitle
        })
    }
    onChangeOpenedBy(e){
        this.setState({
            openedBy: e.target.value
        })
    }

    openDocument(){
        var changesAndDetails = {
            title: this.state.documentTitle,
            user: this.state.openedBy
        }
        console.log(this.state.openedBy);

        axios.post('http://localhost:3001/documents/open/update', changesAndDetails) 
        .then(document => {console.log("worked")})
        .catch((error) => {
            console.log(error);
        })

        window.location = '/documents';
    }

    goBack(){
      
    }
    
    render(){  
        var title = this.state.documentTitle.title;  
        return(
            <div>
                <h1>Open Document</h1>
                <br></br>
                <p>Are you sure you want to open {title}?</p>
                <p>Please note, while you have opened this document no other users will be able to access this document and when closing a new version of this document will be saved!</p>
                
                <div>
                    <label>Please enter your username: </label>
                    <input className="user" type="text" value={this.state.openedBy} onChange={this.onChangeOpenedBy} />
                    <button onClick={this.openDocument}>Open Document</button>
                </div>

            </div>
        )   
    }
}
