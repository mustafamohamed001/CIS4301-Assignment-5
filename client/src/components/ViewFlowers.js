import React, { Component } from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }

    render(){
        var signedin = localStorage.getItem('signedin');

        if(signedin){
            return (
                <div>hello</div>
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

export default Login;
