import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
//components
import Header from "./components/Header";
import Dashboard from "./components/dashboard/Dashboard";

import Profile from "./components/users/Profile";
import Single from "./components/users/Single";
import EditProfile from "./components/users/EditProfile";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Logout from "./components/authentication/Logout";

import Documents from "./components/documents/Home";
import SingleDocument from "./components/documents/Document";
import OpenDocument from "./components/documents/Open";
import UploadDocument from "./components/documents/UploadDocument";
import PublicDocuments from "./components/documents/public/Home";

import JoinChat from "./components/chat/Join";
import Chat from "./components/chat/Chat";

import './App.css';

function App() {
  return(
    <Router>
      <Header />
      <br/>      
      <Route path="/" exact component={Dashboard} />
      <Route path="/user" exact component={Profile} />
      <Route path="/user/register" exact component={Register} />
      <Route path="/user/login" exact component={Login} />
      <Route path="/user/logout" exact component={Logout} />
      <Route path="/user/edit" exact component={EditProfile} />
      <Route path="/user/profile/:username" exact component={Single} />
      <Route path="/documents" exact component={Documents} />
      <Route path="/documents/single/:title" exact component={SingleDocument} />
      <Route path="/documents/:title/open" exact component={OpenDocument} />
      <Route path="/documents/upload" exact component={UploadDocument} />
      <Route path="/public/documents" exact component={PublicDocuments} />
      <Route path="/chat/join" exact component={JoinChat} />
      <Route path="/chat/room" exact component={Chat} />
    </Router>
  );
}

export default App;
