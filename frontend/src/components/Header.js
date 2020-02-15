import React, { Component } from "react";
import { Button, Nav, NavDropdown, Navbar, Form, FormControl } from 'react-bootstrap';

export default class Header extends Component {
    render(){
        return(
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">SkyDocs</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Dashboard</Nav.Link>
            <Nav.Link href="/user">Profile</Nav.Link>
            <Nav.Link href="/documents">Documents</Nav.Link>
            <Nav.Link href="/public/documents">PublicDocuments</Nav.Link>
            <NavDropdown title="Actions" id="basic-nav-dropdown">
                <NavDropdown.Item href="user/edit/:id">Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href="/documents/upload">Upload Document</NavDropdown.Item>
                <NavDropdown.Item href="/chat/join">Chat</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/user/register">Register</NavDropdown.Item>
                <NavDropdown.Item href="/user/login">Sign In</NavDropdown.Item>
                <NavDropdown.Item href="/user/logout">Sign Out</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
            </Navbar.Collapse>
            </Navbar>
        );
    }
}
