import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Card } from 'react-bootstrap'

class Comment extends Component {
    state = {
        username: this.props.username,
        text: this.props.text,
        rating: this.props.rating,
        photo: this.props.photo
        // username: this.props.username,
        // text: this.props.text,
        // rating: this.props.rating,
    };

    constructor(props) {
        super(props);
        this.handleLike.bind(this);
        this.handleDis.bind(this);
    }

    render() {
        console.log("props", this.props)
        return (
            <div class="card" style={{fontWeight: 300, width: '23rem'}}>
                <div class="card-body">
                    {/* {this.props.children} */}
                    <img
                        src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg"
                        alt=""
                        className="rounded-circle z-depth-1-half"
                        style={{float:'left', width: 40}}
                    />
                    {this.formatUsername()}
                    {this.formatComment()}
                    {this.formatRating()}
                </div>
            </div>
        );
    }

    formatUsername() {
        const { username } = this.state
        return username === "" ? <h5>"Unknown User"</h5> : <h5 class="card-title" >{username}</h5>
    }

    formatComment() {
        const { text } = this.state
        return text === "" ? <p>"Loading Comment"</p> : <Card.Text class="card-text">{text}</Card.Text>
    }

    handleLike = () => {
        console.log("Increment Like", this.state.rating[0])
        this.setState({rating: [this.state.rating[0]+1,this.state.rating[1]]})
    }
    
    handleDis() {
        console.log("Increment Dislike", this.state.rating[1])
        this.setState({rating: [this.state.rating[0],this.state.rating[1]+1]})
    }

    formatRating() {
        const { rating } = this.state
        return (
            <div>
                <p class="card-text">{rating[0]} Likes</p>
                <Button class="btn btn-primary mr-2" onClick={ () => this.handleLike()}>Like</Button>
                <p class="card-text">{rating[1]} Dislikes</p>
                <Button class="btn btn-primary mr-2" onClick={ () => this.handleDis()}>Dislike</Button>
            </div>
        );
    }
}

export default Comment