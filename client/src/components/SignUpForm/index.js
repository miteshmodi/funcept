import React from "react";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        // initialize state here

    }
    render() {
        return (
            <div>
                <form>
                    <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="First name" />
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Last name" />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" id="username" placeholder="Username" />
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" id="email" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="button" class="btn btn-secondary">Sign Up</button>
                </form>
            </div>
        );
    }
};

export default SignUpForm;