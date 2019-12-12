import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
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
    }
    
    componentDidMount() { window.addEventListener('load', this.handleLoad)}

    componentWillUnmount() { window.removeEventListener('load', this.handleLoad) }

    render(){
        var signedin = localStorage.getItem('signedin');
        if(this.state.loaded){
            const result = this.state.flowers.map((x,i) => {
                return i % 3 === 0 ? this.state.flowers.slice(i, i+3) : null;
            }).filter(x => x != null);
            const displayflowers = this.state.flowers.map((element,index) => {
                var name = element.COMNAME.replace(/\s+/g, '-');
                var link = `/flowers/${name}.jpg`;
                console.log(link)
                return(
                        <Card key={index}>
                        
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>{element.COMNAME}</Card.Title>
                                    <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Card.Img variant="top" src={link} />
                                </Col>
                            </Row>
                            
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer>
                        </Card> 
                 );
             }
                
            ) 
            if(signedin){
                return (
                    
                    <Container>
                        {displayflowers}
                    </Container>
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
                <br/>
            );
        }
        
    }
    
}

export default Login;
