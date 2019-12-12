import React from 'react';
import logo from '../../assets/logo.svg';
import './Home.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

const Login = () => {
    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6" className = "center">
                <form>
                    <br/>
                    <p className="h4 text-center mb-4">Sign in</p>
                        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                            Your email
                        </label>
                    <input
                        type="email"
                        id="defaultFormLoginEmailEx"
                        className="form-control"
                    />
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                    Your password
                    </label>
                    <input
                        type="password"
                        id="defaultFormLoginPasswordEx"
                        className="form-control"
                    />
                    <div className="text-center mt-4">
                        <button color="indigo" type="submit">Login</button>
                    </div>
                </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

export default Login;
