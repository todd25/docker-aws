import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Row, Col, Button } from 'react-bootstrap'

class Rating extends Component {
    state = {
        rating: [0,0],
        keywords: ["fast shipping", "good customer service", "bad quality"]
    };

    render() {
        return (
            <div>
                {this.formatRating()}
                {this.formatKeywords()}
            </div>
        );
    }



    formatRating() {
        const { rating } = this.state
        return rating === "" ? <h4>"No rating"</h4> : <h4>Rating: {rating[0]}  {rating[1]}</h4>
    }

    formatKeywords() {
        const { keywords } = this.state
        return (
            <ul class="list-group" style={{width: '23rem'}}>
                {keywords.map(keyword => (
                    <li class="list-group-item">{keyword}</li>
                ))}
            </ul>
        );
    }
}

export default Rating;