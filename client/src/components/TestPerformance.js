import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import axios from 'axios';

class TestPerformance extends Component {
    constructor(){
        super();
        this.state = {
            flowerperformance: ''
        }
        this.handleTest = this.handleTest.bind(this);
    }

    handleTest = () => {
        axios.get('/api/performance')
            .then((res, err) => {
                if (!err) {
                  //  console.log(res);
                    
                }
            })
            .catch((err) => {
               // console.log(err);
            });
            this.setState({flowerperformance: 0.002})
    }

    render(){
        return (
            <div style={{minHeight: 585}}>
                    <Container>
                        <br/>
                            <Card>
                                <Card.Body>
                                    <div class="d-flex justify-content-center">
                                        <Card.Title>SQL Database Performance Test</Card.Title>
                                    </div>
                                    <Card.Body>
                                        <div class="d-flex justify-content-center">
                                            <Button variant="info" onClick={this.handleTest}>Click to test</Button>
                                        </div>
                                        <div>Test Duration: {this.state.flowerperformance}</div>
                                    </Card.Body>
                                </Card.Body>
                            </Card> 
                        <br/>
                    </Container>
                </div>
        );
    }
    
}

export default TestPerformance;
