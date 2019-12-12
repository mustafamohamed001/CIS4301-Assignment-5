import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import Login from "./Login/Login"
import NotFound from "./NotFound"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import jwt_decode from 'jwt-decode';

const isLogin = () => {
    try {
        var token = localStorage.getItem('jwtToken');
        var decoded = jwt_decode(token);
    } catch (error) {
        return false;
    }
    if(decoded.username === "admin" && decoded.website === "flowers"){
        return true;
    }
    return false;
}

const PrivateRoute = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
}

export default PrivateRoute;
