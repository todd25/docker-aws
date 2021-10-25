import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button,Card } from 'react-bootstrap'
import '../App.css'

class Comment extends Component {
    state = {
        username: this.props.username,
        text: this.props.text,
        first: this.props.first,
        last: this.props.last,
        date: this.props.date,
        // rating: this.props.rating,
        photo: this.props.photo
        // username: this.props.username,
        // text: this.props.text,
        // rating: this.props.rating,
    };

    constructor(props) {
        super(props);
        console.log("at comment")
        this.handleLike.bind(this);
        this.handleDis.bind(this);
    }

    render() {
        console.log("props", this.props)
        return (
            // <div className="card" style={{fontWeight: 300, width: '23rem'}}>
            //     <div className="card-body">
            //         {/* {this.props.children} */}
            //         <img
            //             src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9)-mini.jpg"
            //             // src={this.state.photo}
            //             alt=""
            //             className="rounded-circle z-depth-1-half"
            //             style={{float:'left', width: 40}}
            //         />
            //         {this.formatUsername()}
            //         {this.formatComment()}
            //         {/* {this.formatRating()} */}
            //     </div>
            // </div>
            <div class="d-flex flex-row comment-row">
                <div class="p-2"><span class="round"><img src={this.state.photo} alt="user" width="50"></img></span></div>
                <div class="comment-text w-100">
                    <h5>{this.state.first} {this.state.last}</h5>
                    <div class="comment-footer"> <span class="date">{this.state.date}</span> <span class="label label-info">Pending</span> <span class="action-icons"> <a href="/#" data-abc="true"><i class="fa fa-pencil"></i></a> <a href="/#" data-abc="true"><i class="fa fa-rotate-right"></i></a> <a href="/#" data-abc="true"><i class="fa fa-heart"></i></a> </span> </div>
                    <p class="m-b-5 m-t-10">{this.state.text}</p>
                </div>
            </div>
        );
    }

    formatUsername() {
        const { username } = this.state
        return username === "" ? <h5>"Unknown User"</h5> : <h5 className="card-title" >{username}</h5>
    }

    formatComment() {
        const { text } = this.state
        return text === "" ? <p>"Loading Comment"</p> : <Card.Text className="card-text">{text}</Card.Text>
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
                <p className="card-text">{rating[0]} Likes</p>
                <Button className="btn btn-primary mr-2" onClick={ () => this.handleLike()}>Like</Button>
                <p className="card-text">{rating[1]} Dislikes</p>
                <Button className="btn btn-primary mr-2" onClick={ () => this.handleDis()}>Dislike</Button>
            </div>
        );
    }
}

export default Comment