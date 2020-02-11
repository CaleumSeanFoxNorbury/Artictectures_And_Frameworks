import React, { Component } from 'react';
import axios from 'axios';

const Document = props =>(
    <tr key={props.document._id}>
        <td>{props.document.title}</td>
        <td>{props.document.type}</td>
        <td>{props.document.uploadedDate}</td>
    </tr>
);

export default class DocumentsHome extends Component{
    constructor(props){
        super(props);

        //this.deleteDocument = this.deleteDocument.bind(this);
    
        this.state = {
            Docs: [],
            isLoaded: false
        };
    }

    componentDidMount(){
        axios.get('http://localhost:3001/documents/', {
            credentials: 'include'
        }) 
        .then(req => {
            this.setState({ 
                Docs: req.data,
                isLoaded: true
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }    

    // deleteDocument(id){
    //     axios.delete('http://localhost:3000/documents/'+id)
    //         .then(res => console.log(res.data));

    //     this.setState({,
    //         documents: this.state.documents.filter(el => el._id !== id)
    //     })
    // }
    
    documentList(){
        return this.state.Docs.map(currentDoc => {
            return <Document document={currentDoc} key={currentDoc._id} />
        });
    }


    render(){
        var isLoaded = this.state.isLoaded;
        var DocumentsTable = this.documentList();        

        if(!(this.state.isLoaded)){
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }else{
            return(
                <div>
                    <h1>Sky Docs</h1>
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Upload Date</th>                
                        </tr>
                    </table>
                    {DocumentsTable}
                </div>
            )
        }
    }
}

// return(
//     <div>
//         <h1>Documents</h1>
//         <tr>
//             <th>Title</th>
//             <th>Type</th>
            
//         </tr>
//         {DocumentsTable}
//     </div>
// )