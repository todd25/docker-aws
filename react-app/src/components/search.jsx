import React, { Component } from "react";
// import { MDBCol } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col, Button } from 'react-bootstrap'

class Search extends Component {
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
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                        <p>Enter website to search:</p>
                    </Col>
                    <Col sm={3} className="my-1">
                        <input
                            type="text"
                            onChange={this.myChangeHandler}
                        />
                    </Col>
                    <Col sm={3} className="my-1">
                        <Button type='submit'>Submit</Button>
                    </Col>
                </Row>
            </form>
          );
    }
}

export default Search;