import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Row, Col, Button } from 'react-bootstrap'

class Rating extends Component {
    state = {
        rating: [0,0],
        keywords: ["fast shipping", "good customer service", "bad quality"],
        isLoaded: false,
        items:[],
        URL: "asd"
    };

    render() {
        return (
            <div>
                {this.formatRating()}
                {this.formatKeywords()}
            </div>
        );
    }
    componentDidMount() {
        fetch("/set", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type: 0,
                url: "www.gogasdole.com",
                ratings: [12,2]
                // URL: this.state.URL,
             })
            })
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              // this.setState({
              //   isLoaded: true,
              //   items: result.members
              // });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }

    formatRating() {
        const { rating } = this.state
        return rating === "" ? <h4>"No rating"</h4> : <h4>Rating: {rating[0]}  {rating[1]}</h4>
    }

    formatKeywords() {
        const { keywords, isLoaded, items } = this.state
        if (isLoaded) {
            return (
                <ul>
                  {items.map(item => (
                    <li key ="{]">
                      {item}
                    </li>
                  ))}
                </ul>
              );
        } else {
            return (
                <ul className="list-group" style={{width: '23rem'}}>
                    {keywords.map(keyword => (
                        <li key = {keyword} className="list-group-item">{keyword}</li>
                    ))}
                </ul>
            );
        }
    }
}

export default Rating;