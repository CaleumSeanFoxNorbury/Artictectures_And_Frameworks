import React, { Component } from 'react';
// import axios from 'axios';

export default class Logout extends Component{
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state ={
            choice: ''
        } 
    } 

    logout(e){
        this.setState({
            choice: true
        })
        console.log("true");
    }
    
    goBack(e){
        this.setState({
            choice: false
        })
        console.log("false");
    }

    render(){
        return(
            <div>
                <h1>Are you sure you want to logout?</h1>
                <button  onClick={this.logout}>
                    Yes, im sure.
                </button>
                <button onClick={this.goBack}>
                    Go Back
                </button>
            </div>
        );
    }
}


// const RuleResults = React.createClass({
//     showMessage: function (rule) {
//       if (rule.ShowMessageToUser == true) {
//         alert(rule.MessageToUser);
//       }
//     },
//     render: function () {
  
//       var rules = this.props.businessRules.map((rule) => {
//         return (
//           <tr>
//             <td>
//               <a href={rule.HREF} onClick={this.showMessage(rule)} target='_blank'>{rule.Name}</a>
//             </td>
//           </tr>
//         );
//       });
//       return (
//         <div>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rules}
//             </tbody>
//           </table>
//         </div>
//       );
//     }
//   });