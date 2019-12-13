import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Login extends Component {
    constructor(){
        super();
        this.state = {
            flowers: [],
            loaded: false,
            sightings: [],
        }
        this.handleLoad = this.handleLoad.bind(this);
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

        axios.post('/api/getsightings')
        .then((res,err) => {
            var tempsightings = [];

            for (var j = 0; j < res.data.length; j++){
                tempsightings.push(res.data[j]);
            }
            this.setState({
                sightings: tempsightings,
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }
    
    componentDidMount() { window.addEventListener('load', this.handleLoad)}

    componentWillUnmount() { window.removeEventListener('load', this.handleLoad)}

    render(){
        var signedin = localStorage.getItem('signedin');
        if(this.state.loaded){
            const getsightings = (name) => {
                var s = this.state.sightings
                var s2 = []
                s = s.sort((a, b) => new Date(b.SIGHTED.split('/').reverse()) - new Date(a.SIGHTED.split('/').reverse()));
                
                /* var sight = s.map((element, index) => {
                    if (element.NAME === name) {

                        s2.push(s)
                    }
                    else {
                        return
                    } 
                });

                s2.splice(0,10) */

                var sight2 = s.map((element, index) => {

                    if (element.NAME === name) {
                        return (
                            <div>
                                <li>{element.PERSON} | {element.LOCATION} | {element.SIGHTED}</li>
                            </div>
                            
                        );
                    }
                    else {
                        return <div></div>
                    }
                    
                });

                return sight2;
            }

/*             const result = this.state.flowers.map((x,i) => {
                return i % 3 === 0 ? this.state.flowers.slice(i, i+3) : null;
            }).filter(x => x != null); */
            const displayflowers = this.state.flowers.map((element, index) => {
                var name = element.COMNAME.replace(/\s+/g, '-');
                var link = `/flowers/${name}.jpg`;
                return(
                    <Container>
                        <br/>
                            <Card>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{element.COMNAME}</Card.Title>
                                        <Card.Text>
                                        GENUS: {element.GENUS}
                                        <br/>
                                        SPECIES: {element.SPECIES}
                                        <br/>
                                        Most Recent Sightings:
                                        {getsightings(element.COMNAME)}
                                        </Card.Text>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Card.Img variant="top" src={link} />
                                    </Col>
                                </Row>
                                <Button variant="primary">Update Flower</Button>
                                <Button variant="primary">Update Sightings</Button>
                                <Button variant="danger">Delete</Button>
                            </Card.Body>
                            </Card> 
                        <br/>
                    </Container>
                 );
             }
                
            ) 
            if(signedin){
                return (
                    <div style={{minHeight: 585}}>
                        <Container>
                            {displayflowers}
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
        else{
            return(
                <div style={{minHeight: 585}}/>
            );
        }
        
    }
    
}

export default Login;
