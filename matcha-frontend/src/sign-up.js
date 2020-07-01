import React, { Component } from 'react';

class SignUp extends Component {

    constructor() {
        super();
          this.state = {
            
          }
    }

    render() {
        return(
            <div className="center-text log-flex">
                <form className="form-signup">
                    <h1 className="h3 mb-3 font-weight-normal text-center">Account Creation</h1>
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
                    <div className="mb-3">
                        <label for="password">Password</label>
                        <div className="input-group">
                            <input type="password" className="form-control" id="password" placeholder="Insert Password Senpai" required />
                            <div className="invalid-feedback">
                                Your password is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="passwordconfirm">Password Confirm</label>
                        <div className="input-group">
                            <input type="password" className="form-control" id="passwordconfirm" placeholder="Hint Hint *****" required />
                            <div className="invalid-feedback">
                                Your password does not match
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="address">Address</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="address" placeholder="1 Endless Horizon Avenue" required />
                            <div className="invalid-feedback">
                                Your email is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="dob">Date of Birth</label>
                        <div className="input-group">
                            <input type="date" className="form-control" id="dob" placeholder="I is Born!" required />
                            <div className="invalid-feedback">
                                Your Date of Birth is required
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="gender">Gender</label>
                        <div className="custom-control radio pad-zero">
                            <label className="custom-cotrol-label" for="male">
                                <input type="radio" className="" id="male" name="gender" required />
                                Male
                            </label>
                        </div>
                        <div className="custom-control radio pad-zero">
                            <label className="custom-cotrol-label" for="female">
                                <input type="radio" className="" id="female" name="gender" required />
                                Female
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">
                        Register
                    </button>
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