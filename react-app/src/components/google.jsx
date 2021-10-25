import React, { Component } from "react";
import GoogleLogin from 'react-google-login'



// function setUser(m,e,l,f,img) {
// return fetch('/set',{
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         type: 3,
//         method: m,
//         email: e,
//         last_name: l,
//         first_name: f,
//         image: img
//         })
//         }
//     )
//     .then(res => res.json()) 
//     .then((result) => {
//         console.log(result);
//         return Promise.resolve(result)
//     }) 
// }


class Google extends Component {
//"data:image/jpeg;base64," + 
    responseGoogle= (response) => {
        // console.log(response.profileObj);
        this.props.userLogin(response.profileObj)
    }

    responseGoogleFail= (response) => {
        console.log(response.profileObj);
        this.props.userLogin(response.profileObj)
    }

    render() {
        return (
            <div>
                <GoogleLogin
                clientId="440000272733-9a1d8i91mvrq1jq9lfetvckg9kf8nq7r.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogleFail}
                cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}

export default Google

/* <div class="col s12 m6 offset-m3 center-align">
    <a class="oauth-container btn darken-4 white black-text" href="/users/google-oauth/" style="text-transform:none">
        <div class="left">
            <img width="20px" style="margin-top:7px; margin-right:8px" alt="Google sign-in" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        </div>
        Login with Google
    </a>
</div>

<!-- Compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">

<!-- Compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script> */