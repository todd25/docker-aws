import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

class Submit extends Component {
    state = {
        URL: "",
    };

    render() {
        return (
            <div>
                {this.formatForm()}
            </div>
        );
    }

    mySubmitHandler = (event) => {
        console.log("submitted URL :" + this.state.URL)
      }

    myChangeHandler = (event) => {
        this.setState({URL: event.target.value});
        console.log("URL :" + this.state.URL)
      }

    formatForm() {
        // const { URL } = this.state
        return (
            <form onSubmit={this.mySubmitHandler}>
              <p>Enter your comment:</p>
              <input
                type="text"
                onChange={this.myChangeHandler}
              />
              <Button type='submit'>Submit</Button>
            </form>
          );
    }
}

export default Submit;