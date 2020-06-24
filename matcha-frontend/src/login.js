import React, { Component } from 'react';

class login extends Component {
    render() {
        return (
            <div className="text-center log-flex">
                <form className="form-signin">
                    <img className="mb-4" src={require("./uwu.jpg")} alt height="400" width="300" />
                    <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                    <label for="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                    <button claasName="btn btn-lg btn-primary btn-block" type="submit">Sign-in</button>
                    <p className="mt-5 mb-3 text-muted">Copyrighted By Endless Horizon</p>
                </form>
            </div>
        );
    }
}

export default login;