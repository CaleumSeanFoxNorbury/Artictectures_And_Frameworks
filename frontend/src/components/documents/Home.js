import React, { Component } from 'react';
import axios from 'axios';
import './css/DocumentStyles.css';

const Document = props =>(
    <tr key={props.document._id}>
        <a class="props-link" href={"/documents/single/" + props.document.title}><td>{props.document.title}</td></a>
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
                    <table id="documents">
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Upload Date</th>                
                        </tr>                      
                            {DocumentsTable}
                    </table>
                    
                    <div id="Sub-Page" class="subpage">
                        <div class="subpage-content ">
                            <span class="close">&times;</span>
                            <h2>Checkout</h2>
                            <br></br>
                            <p>Please select a method of payment to proceed with: </p>
                            <br></br>
                            <button class="btn-subpage-checkout" onClick="">Card</button>
                            <button class="btn-subpage-checkout" onClick="">Cash</button>
                        </div>
                    </div>

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