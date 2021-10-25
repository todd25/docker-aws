import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Alert } from 'react-bootstrap'
// import { setComment,getUserResult } from './helper'

export function getUserResult(email="toddlzt@gmail.com",last="Li",first="Todd") {
  // return {}
  return Promise.all([setUser("email",email,last,first)])
}

function setUser(m,e,l,f) {
  return fetch('/set',{
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          type: 3,
          method: m,
          email: e,
          last_name: l,
          first_name: f,
          image: ""
          })
        }
      )
      .then(res => res.json()) 
      .then((result) => {
        console.log(result);
        return Promise.resolve(result)
      }) 
}

// function setComment(user,url,val) {
//   return fetch('/set',{
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//         type: 1,
//         website: url,
//         user: user,
//         text: val,
//         date: ""
//         })
//       }
//     )
    // .then(res => res.json()) 
    // .then((result) => {
    //   console.log(result);
    //   return Promise.resolve(result)
    // }) 
// }
// function AlertDismissibleExample() {
//   const [show, setShow] = useState(true);

//   if (show) {
//     return (
//       <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//         <p>
//           Change this and that and try again. Duis mollis, est non commodo
//           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//           Cras mattis consectetur purus sit amet fermentum.
//         </p>
//       </Alert>
//     );
//   }
//   return <Button onClick={() => setShow(true)}>Show Alert</Button>;
// }


class Submit extends Component {
    state = {
        user:"asd",
        URL: "www.asd.com",
        showWarning: false,
        hasUserLoggedIn: this.props.hasUserLoggedIn
    };

    constructor(props) {
      super(props)
      // getUserResult().then(([result]) => {
      //   this.state.user = result;
      //   console.log(this.state.user.email)
      // })
    }

    render() {
        return (
            <div>
                {this.formatForm()}
                {this.formatWarning()}
            </div>
        );
    }

    showWarning(res) {
      this.setState({showWarning: res})
    }

    formatWarning() {
      const { showWarning } = this.state
      return showWarning === false ? <h5></h5> : 
        <Alert variant="danger" onClose={() => this.showWarning(false)} dismissible>
        <Alert.Heading>Please sign in before commenting!</Alert.Heading>
        <p>
          In order to keep our platform and you safe, we kindly ask you to sign in first before commenting.
        </p>
      </Alert>
  }

    mySubmitHandler = (event) => {
        console.log(this.props)
        if (this.props.hasUserLoggedIn === false) {
          this.setState({showWarning: true})
        } else {
          const formData = new FormData(event.currentTarget);
          event.preventDefault();
          for (let [key, value] of formData.entries()) {
            this.props.submitComment(value);
          }
        }
        return false
    }

    myChangeHandler = (event) => {
      // this.submit_comment()
      // this.setState({URL: event.target.value});
      // console.log("URL :" + this.state.URL)
    }

    formatForm() {
        // const { URL } = this.state
        return (
            <form onSubmit={this.mySubmitHandler}>
              <p>Enter your comment:</p>
              <input name="space"
                type="text"
                onChange={this.myChangeHandler}
              />
              <button>Submit</button>
            </form>
          );
    }
}

export default Submit;