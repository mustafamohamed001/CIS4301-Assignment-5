import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class signout extends Component {

    render(){
        localStorage.removeItem('signedin');
        return(
            <main>
                <Redirect to={{
                    pathname: '/listflowers'
                }}
                />
            </main>
        );
    }
}

export default signout;
