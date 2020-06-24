import React, { Component } from 'react';

class SignUp extends Component {
    render() {
        return(
            <div className="center-text log-flex">
                <form className="form-signup">
                    <h1 className="h3 mb-3 font-weight-normal">Account Creation</h1>
                    <div className="mb-3">
                        <label for="name">Name</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="name" placeholder="Name" required />
                            <div className="invalid-feedback">
                                Your name is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="surname">Surname</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="surname" placeholder="Surname" required />
                            <div className="invalid-feedback">
                                Your surname is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="username">Username</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="username" placeholder="Username" required />
                            <div className="invalid-feedback">
                                Your username is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="email">Email</label>
                        <div className="input-group">
                            <input type="email" className="form-control" id="email" placeholder="EndlessHorizon@example.com" required />
                            <div className="invalid-feedback">
                                Your email is required
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    };
}

// 

{/* <div className="invalid-feedback" style="width: 100%">
Your username is required
</div> */}

// 
export default SignUp