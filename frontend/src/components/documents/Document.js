import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import './css/DocumentStyles.css';

export default class Document extends Component{
    constructor(props){
        super(props);

        this.closeDocument = this.closeDocument.bind(this);
        this.onChangeIsOpen = this.onChangeIsOpen.bind(this);
        this.onChangeOpenedBy = this.onChangeOpenedBy.bind(this);

        this.state = {
            docTitle: this.props.match.params,
            title: '',
            type: '',
            date: '',
            isOpen: '',
            openedBy: ''
        };
    }

    componentDidMount(){
        var DocumentTitle = {
            title: this.state.docTitle
        }

        axios.post('http://localhost:3001/documents/single/:title', DocumentTitle) 
        .then(document => {
            var data = document.data;
            this.onChangeTitle(data.title);
            this.onChangeType(data.type);
            this.onChangeDate(data.uploadedDate);
            this.onChangeIsOpen(data.isOpen);
            this.onChangeOpenedBy(data.openedBy);
        })
        .catch((error) => {
            console.log(error);
        })
   }  
   
    onChangeTitle(title){
        this.setState({
            title: title
        })
    }

    onChangeType(type){
        this.setState({
            type: type
        })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onChangeIsOpen(bool){
        this.setState({
            isOpen: bool
        })
    }
    onChangeOpenedBy(user){
        this.setState({
            openedBy: user
        })
    }


    closeDocument(){
        const closingDocument = {
            title: this.state.title,
            openedBy: this.state.openedBy
        }
        alert("You have saved a document!");
        console.log("You have just saved:", this.state.title);

        axios.post('http://localhost:3001/documents/close/update', closingDocument)

        window.location= '/documents';
    }
    
    render(){  
        var isOpened = this.state.isOpen;    
        if(!isOpened){
            return(
                <div>
                    <h1>Document Preview</h1>
                    
                    <p>Document Title: {this.state.title}</p>
                    <p>Document Type: {this.state.type}</p>
                    <p>Document Upload Date: {this.state.date}</p>
                    <Link to={"/documents/"+ this.state.title +"/open"} className="btn btn-primary">Open Document</Link>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Document Preview</h1>
                    <br></br>
                    <p>Document Title: {this.state.title}</p>
                    <p>Document Type: {this.state.type}</p>
                    <p>Document Upload Date: {this.state.date}</p>
                    <br></br>
                    <p>Document is opened by: {this.state.openedBy}</p>
                    <br></br>
                    <p>Note: by closing the document the system will automatically close save a version of the document, please note before continuing.</p>
                    <button onClick={this.closeDocument} className="btn btn-primary">Close Document</button>
                </div>
            )
        }
    }
}
