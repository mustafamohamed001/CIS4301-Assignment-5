import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBInput } from "mdbreact";
import Dropdown from "react-bootstrap/Dropdown"

class NewSighting extends Component {
    constructor(){
        super();
        this.state = {
            flowers: [],
            flowername: '',
            personname: '',
            location: '',
            dateofsighting: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoad = this.handleLoad.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    handleLoad = () => {
        axios.post('/api/getflowers')
        .then((res, err) => {
            var tempflowers = [];

            for (var i = 0; i < res.data.length; i++) {
                tempflowers.push({"GENUS": res.data[i]['GENUS'], "SPECIES": res.data[i]['SPECIES'], "COMNAME": res.data[i]['COMNAME']});
            }
            this.setState({
                flowers: tempflowers,
                loaded: true,
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() { window.addEventListener('load', this.handleLoad)}

    componentWillUnmount() { window.removeEventListener('load', this.handleLoad)}

    render(){

        const displayflowers = this.state.flowers.map((element, index) => {
            var name = element.COMNAME.replace(/\s+/g, '-');

            return(
                <Dropdown.Item>{element.COMNAME}</Dropdown.Item>
            );
         }
            
        )

        var signedin = localStorage.getItem('signedin');
        if(signedin){
            return(
                <div style={{minHeight: 585}}>
                    <Container>
                        <br/>
                            <Card>
                                <Card.Body>
                                    <div class="d-flex justify-content-center">
                                        <Card.Title>New Sighting Form</Card.Title>
                                    </div>
                                    <Card.Body>
                                        <Row>
                                                <p>Flower Name: <Dropdown>
                                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                    Select a Flower
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu style={{overflowY: 'scroll', maxHeight: (window.innerHeight - (this.myRef ? (this.myRef.getBoundingClientRect().top + this.myRef.getBoundingClientRect().height + 100) : 200))}}>
                                                                    <Dropdown.Item href="#/action-1">New</Dropdown.Item>
                                                                    {displayflowers}
                                                                </Dropdown.Menu>
                                                                </Dropdown></p>
                                                <p>Your Name: <MDBInput value={this.state.personname} name="personname" onChange={this.handleInputChange}/></p>
                                                <p>Location: <MDBInput value={this.state.location} name="location"/></p>
                                                <p>Date of Sighting: <MDBInput value={this.state.dateofsighting} name="dateofsighting"/></p>                                           
                                        </Row>
                                        <div class="d-flex justify-content-center">
                                            <Button variant="primary" >Finish</Button>
                                        </div>
                                    </Card.Body>
                                </Card.Body>
                            </Card> 
                        <br/>
                    </Container>
                </div>
                
            );
        }
        else{
            return(
                <Redirect to={{
                    pathname: '/login'
                }}/>
            )
        }
    }
}

export default NewSighting;
