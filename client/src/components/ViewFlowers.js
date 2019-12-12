import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
            console.log(this.state.flowers)
    
             const displayflowers = this.state.flowers.map((element,index) => 
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>{element.COMNAME}</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>    
            ) 
            if(signedin){
                return (
                    <div style = {{minHeight: 850}}>
                    {displayflowers}
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
                <div></div>
            );
        }
        
    }
    
}

export default Login;
