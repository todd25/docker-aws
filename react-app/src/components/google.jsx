import React, { Component } from "react";
import GoogleLogin from 'react-google-login'

class Google extends Component {

    responseGoogle= (response) => {
        console.log(response);
        console.log(response.profileObj);

    }
    
    render() {
        return (
            <div>
                <GoogleLogin
                clientId="440000272733-9a1d8i91mvrq1jq9lfetvckg9kf8nq7r.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default Google