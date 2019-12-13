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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
        console.log(name, value);
    }

    handleSubmit = () => {
        axios.post('/api/sightingsInsert', {
            name: this.state.flowername,
            person: this.state.personname,
            location: this.state.location,
            date: this.state.dateofsighting,
        })
            .then((res, err) => {
                if (!err) {
                    console.log(res);
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                                <p>Flower Name: <MDBInput label="Flower Name" value={this.state.flowername} name="flowername" onChange={this.handleInputChange}/></p>
                                                <p>Your Name: <MDBInput label="Your Name" value={this.state.personname} name="personname" onChange={this.handleInputChange}/></p>
                                                <p>Location: <MDBInput label="Location" value={this.state.location} name="location" onChange={this.handleInputChange}/></p>
                                                <p>Date of Sighting: <MDBInput label="Date of Sighting" value={this.state.dateofsighting} name="dateofsighting" onChange={this.handleInputChange}/></p>                                           
                                        </Row>
                                        <div class="d-flex justify-content-center">
                                            <Button variant="primary" onClick={this.handleSubmit}>Finish</Button>
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
