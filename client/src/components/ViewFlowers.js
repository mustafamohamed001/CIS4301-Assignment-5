import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBInput } from "mdbreact";
class Login extends Component {
    constructor(){
        super();
        this.state = {
            flowers: [],
            loaded: false,
            sightings: [],
            showSighting: false,
            idx: 0,
            showBox: false,
            genus: '',
            species: '',
            comname: '',
            oldgenus: '',
            oldspecies: '',
            oldcomname: ''
        }
        this.handleLoad = this.handleLoad.bind(this);
        this.showSightings = this.showSightings.bind(this);
        this.showInputBox = this.showInputBox.bind(this);
        this.hideSightings = this.hideSightings.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    showInputBox = (index, comname, genus, species) => {
        this.setState({
            idx: index,
            showBox: true,
            comname: comname,
            genus: genus,
            species: species,
            oldcomname: comname,
            oldgenus: genus,
            oldspecies: species
        })
    }

    showSightings = (index) => {
        console.log(index)
        this.setState({
            showSighting: true,
            idx: index
        })
    }

    hideSightings = (index) => {
        console.log(index)
        this.setState({
            showSighting: false,
            idx: index
        })
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

    handleDelete = (comname, genus, species) => {
        axios.post('/api/flowersDelete', {
            "name": comname,
            "genus": genus,
            "species": species
        }
        )
            .then((res, err) => {
                if (!err) {
                    console.log(res.data);
                    window.location.reload(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            showBox: false
        })
    }

    handleChange = () => {
        axios.post('/api/flowersupdate', {
            "oldcomname": this.state.oldcomname,
            "oldgenus": this.state.oldgenus,
            "oldspecies": this.state.oldspecies,
            "comname": this.state.comname,
            "genus": this.state.genus,
            "species": this.state.species
        }
        )
            .then((res, err) => {
                if (!err) {
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        this.setState({
            showBox: false
        })
        window.location.reload(false);
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
                var cnt = 0;
                var sight2 = s.map((element, index) => {

                    if (element.NAME === name && cnt < 10) {
                       cnt++;
                        return (
                            <div>
                                <p>
                                    <li>Person: {element.PERSON}</li>
                                    <li>Location: {element.LOCATION}</li>
                                    <li>Date: {element.SIGHTED}</li>
                                </p>
                            </div>
                            
                        );
                        
                    }
                    else {
                        return <div></div>
                    }
                    
                });

                return sight2;
            }

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
                                        <Card.Title>{(this.state.showBox && this.state.idx === index) ? 
                                                    <MDBInput value={this.state.comname} onChange={this.handleInputChange} name="comname"/> : element.COMNAME}</Card.Title>
                                        <Card.Text>
                                        GENUS: {(this.state.showBox && this.state.idx === index) ? 
                                                    <MDBInput value={this.state.genus} onChange={this.handleInputChange} name="genus"/> : element.GENUS}
                                        <br/>
                                        SPECIES: {(this.state.showBox && this.state.idx === index) ? 
                                                    <MDBInput value={this.state.species} onChange={this.handleInputChange} name="species"/> : element.SPECIES}
                                        <br/>
                                        {(this.state.showSighting && this.state.idx === index) ? <div>Most Recent Sightings:</div> : <div></div>}
                                        {(this.state.showSighting && this.state.idx === index) ? getsightings(element.COMNAME) : <div></div>}
                                        
                                        </Card.Text>
                                    </Col>
                                    <Col xs={6} md={4}>
                                        <Card.Img variant="top" src={link} onError={(e)=>{e.target.onerror = null; e.target.src="/flowers/generic.jpg"}}  />
                                    </Col>
                                </Row>
                                {(this.state.showBox && this.state.idx === index) ? 
                                                <Button variant="primary" onClick={e=>this.handleChange(index)}>Finish</Button> : 
                                                <Button variant="primary" onClick={e=>this.showInputBox(index, element.COMNAME, element.GENUS, element.SPECIES)}>Update Flower</Button>}
                                {(this.state.showSighting && this.state.idx === index) ? 
                                                <Button variant="primary" onClick={e=>this.hideSightings(index)}>Hide Sightings</Button> : 
                                                <Button variant="primary" onClick={e=>this.showSightings(index)}>Show Sightings</Button>}
                                <Button variant="danger" onClick={e=>this.handleDelete(element.COMNAME, element.GENUS, element.SPECIES)}>Delete</Button>
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
