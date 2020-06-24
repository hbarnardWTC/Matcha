import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class login extends Component {
    render() {
        return (
            <div className="text-center">
                <form className="form-signin">
                    <img className="mb-4" src={require("./uwu.jpg")} />
                    <h1 className="h3 mb-3 font-weight-normal">Please Sign In</h1>
                    <label for="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />

                </form>
            </div>
        );
    }
}

export default login;