import React, { Component } from "react";
import Comment from "./comment"
import Submit from "./submit"

class Comments extends Component {
    state = {
        comments: [
            {id:1, username: "Jordan", text: "I've shopped here a few times, all products are great!", rating: [1,3], photo: ""},
            {id:2, username: "Stanley", text: "I don't like the products here.", rating: [2,4], photo: ""},
            {id:3, username: "Todd", text: "Fast shipping!", rating: [8,8], photo: ""},
            // {id:4, username: "SB", text: "t4", rating: [0,0]}
        ],
        submit: {id:1}
    };

    render() {
        return (
            <div>
                { this.state.comments.map(comments => 
                <Comment key={comments.id} 
                        username={comments.username} 
                        text={comments.text} 
                        rating={comments.rating} 
                        photo={comments.photo} 
                        selected={true}>
                    <h2>Comment ID{comments.id}</h2>
                </Comment>
                )}
                <Submit>
                </Submit>
            </div>
        );
    }
}

export default Comments;