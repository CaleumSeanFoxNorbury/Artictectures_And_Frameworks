import React, { Component } from 'react';
import axios from 'axios';

export default class UploadDocument extends Component{
    constructor(props){
        super(props);

        //refering this to the class
        this.onChangeDocumentTitle = this.onChangeDocumentTitle.bind(this);
        this.onChangeDocumentType = this.onChangeDocumentType.bind(this);
        this.onChangeDocumentSharedUsers = this.onChangeDocumentSharedUsers.bind(this);
        this.onChangeDocumentUplaodDate = this.onChangeDocumentUplaodDate.bind(this);
        this.onChangePublicDocument = this.onChangePublicDocument.bind(this);
        this.onChangeDocumentCover = this.onChangeDocumentCover.bind(this);
        this.onChangeDocumentFile = this.onChangeDocumentFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            documentTitle: '',
            documentCover: '',
            documentFile: '',
            documentType: '.doc',
            public: false,
            sharedUsers: [],
            uploadDate : new Date(),
            owner: ''
        } 
    }

    componentDidMount(){
        this.setState({
            sharedUsers: ['test sharedUsers'],
            owner: 'test owner'
        })
    }

    onChangeDocumentTitle(e){
        this.setState({
            documentTitle: e.target.value
        })
    }

    onChangeDocumentCoverPhoto(e){
        this.setState({file:e.target.files[0]})    
    }

    onChangeDocumentFile(e){
        this.setState({file:e.target.files[0]})    
    }

    onChangeDocumentType(e){
        this.setState({
            documentType: e.target.value
        })
    }

    onChangePublicDocument(e){
        this.setState({
            public: true
        })
    }

    onChangeDocumentCover(e){
        this.setState({
            documentCover: e.target.value
        })
    }

    onChangeDocumentSharedUsers(e){
        this.setState({
            sharedUsers: e.target.value
        })
    }

    onChangeDocumentUplaodDate(date){
        this.setState({
            uploadDate: date
        })
    }

    onSubmit(e){
        e.preventDefault();
        const document = {
            documentTitle: this.state.documentTitle,
            documentCover: this.state.documentCover,
            documentFile: this.state.documentFile,
            documentType: this.state.documentType,
            public: this.state.public,
            sharedUsers: this.state.sharedUsers,
            uploadDate: this.state.uploadDate        
        }
        try{
            axios.post('http://localhost:3001/documents/upload', document)
            .then(res => console.log("Upload document", res.data));

            window.location ='/documents';
        }catch{
            window.location = '/';
        }           
    }

    render(){
        return(
            <div>
                <h1>Upload A Document</h1>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Document Title: </label>
                        <input type="text" required className="form-control" value={this.state.documentTitle} onChange={this.onChangeDocumentTitle} />
                    </div>
                    <div className="form-group">
                        <label>Document Cover: </label>
                        <input className="cover-upload" type="file" value={this.state.documentCover} onChange={this.onChangeDocumentCover} />
                    </div>
                    <div className="form-group">
                        <label>Document Type: </label>
                        <select requried value={this.state.documentType} onChange={this.onChangeDocumentType}>
                            <option value="txt">.txt</option>
                            <option value=".doc">.doc</option>
                            <option value="odt">.odt</option>
                            <option value="mp3">.mp3</option>
                            <option value="mp4">.mp4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Document file: </label>
                        <input className="document-upload" type="file" value={this.state.documentFile} onChange={this.onChangeDocumentFile} />
                    </div>
                    <div className="form-group">
                        <label>Public Document: </label>
                        <input type="checkbox" className="ispublic" value={this.state.public} onClick={this.onChangePublicDocument}></input>
                    </div>
                    <div className="form-group"> 
                        <label>Users to share with: </label>
                        <select ref="userInput"
                            className="form-control"
                            value={this.state.sharedUsers}
                            onChange={this.onChangeDocumentSharedUsers}>
                            {
                                this.state.sharedUsers.map(function(user) {
                                return <option 
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="UploadDocument" className="btn-btn"></input>
                    </div>
                </form>
            </div>
        )
    }
}

