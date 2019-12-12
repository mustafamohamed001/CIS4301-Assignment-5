import React from 'react';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    var signedin = localStorage.getItem('signedin');

    if(signedin){
        return (
            <Navbar bg="primary" variant="dark" expand="lg" >
                <Navbar.Brand href="/">Southern Sierra Wildflower Club</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/listflowers">Select Flowers</Nav.Link>
                    <Nav.Link href="#link">Update Information</Nav.Link>
                    <Nav.Link href="#link">New Sighting</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: <a href="#login">Admin</a>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    else{
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/home">Southern Sierra Wildflower Club</Navbar.Brand>
            </Navbar>
        );
    }

}

export default Header;
