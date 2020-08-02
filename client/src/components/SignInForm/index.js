import React from "react";

class SignInForm extends React.Component {
    constructor(props) {
      super(props);
      // initialize state here
  
    }
    render() {
      return (
        <div>
            <form>
                <div class="form-group">
                    <input type="email" class="form-control" id="email" placeholder="Email" />
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="password" placeholder="Password" />
                </div>
                <button type="button" class="btn btn-secondary">Sign In</button>
            </form>
        </div>
      );
    }
  };

export default SignInForm;