import React, { Component } from "react";
import Comment from "./comment"
import Submit from "./submit"
// import {getUserResult} from "./submit"
import '../App.css'
import Google from "./google";
// import { setComment } from "./helper";

function loadComments(url) {
    // return Promise.all([setUser("email","toddlzt@gmail.com","Li","First")])
    return Promise.all([getComments(url)])
}
function setComment(url, email, text) {
    // return Promise.all([setUser("email","toddlzt@gmail.com","Li","First")])
    return Promise.all([setComments(url, email, text)])
}


const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
        }
    });
    } 

function setComments(url, email, text) {
    return fetch('/set',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            type: 1,
            website: url,
            user: email,
            text: text,
            date: "",
            })
            }
        )
        .then(res => res.json()) 
        .then((result) => {
            console.log(result);
            return Promise.resolve(result)
    }) 
}

function getComments(url) {
    return fetch('/get',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            type: 1,
            method: "website",
            website: url,
            user: "",
            text: "",
            ratings: "",
            date: "",
            })
          }
        )
        .then(res => res.json()) 
        .then((result) => {
          console.log(result);
          return Promise.resolve(result)
    }) 
}

class Comments extends Component {
    state = {
        user:"",
        URL: "www.asd.com",
        comments: [],
        // comments2: [
        //     {id:1, username: "Jordan", text: "I've shopped here a few times, all products are great!", rating: [1,3], photo: ""},
        //     {id:2, username: "Stanley", text: "I don't like the products here.", rating: [2,4], photo: ""},
        //     {id:3, username: "Todd", text: "Fast shipping!", rating: [8,8], photo: ""},
        //     {id:4, username: "SB", text: "t4", rating: [0,0]}
        // ],
        submit: {id:1},
        hasUserLoggedIn: false
    };

    constructor() {
        super()
        // getUserResult().then(([result]) => {
        //     this.state.user = result;
        //     console.log(this.state.user.email)
        // })

        loadComments(this.state.URL).then(([result]) => {
            this.setState({comments: result});
            console.log(this.state.comments)
        })
        this.userLogin = this.userLogin.bind(this)
        this.submitComment = this.submitComment.bind(this)
    }

    // componentDidMount() {
    //     fetch("/get", {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //             type: 1,
    //             method: "website",
    //             website: "www.gogasdole.com",
    //             user: ""
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(
    //         (result) => {
    //             console.log(result)
    //             var myObj = JSON.parse(result);
    //             for (let i = 0; i < myObj.length; i++) {
    //                 this.state.comments.push(myObj[i]["_id"], myObj[i]["text"], 
    //                         myObj[i]["ratings"], myObj[i]["date"], "")
    //             }
    //             console.log(this.state.comments)
    //             // this.setState({
    //             //   isLoaded: true,
    //             //   items: result.members
    //             // });
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //             this.setState({
    //             isLoaded: true,
    //             error
    //             });
    //         }
    //     )
    // }

      
    userLogin(res) {
        console.log(res)
        
        this.setState( {
            user: res,
            hasUserLoggedIn: true
        });
        console.log(this.state.user.email)
    }

    submitComment(res) {
        console.log(res)
        setComment(this.state.URL, this.state.user.email,res) .then(([result]) => {
            this.setState({comments: result});
            console.log(this.state.comments)
        })
    }
    render() {
        return (
            <div class="container d-flex justify-content-center mt-100 mb-100">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Recent Comments</h4>
                                <h6 class="card-subtitle">Latest Comments section by users</h6>
                            </div>
                            <div class="comment-widgets m-b-20">
                                { this.state.comments.map(comments => 
                                <Comment key={comments._id} 
                                        first={comments.first_name} 
                                        last={comments.last_name} 
                                        username={comments.user} 
                                        text={comments.text} 
                                        rating={comments.rating} 
                                        photo={comments.image} 
                                        date={comments.date} 
                                        selected={true}>
                                    {/* <h2>Comment ID{comments.id}</h2> */}
                                </Comment>
                                )}
                                <Submit hasUserLoggedIn={this.state.hasUserLoggedIn}
                                        submitComment={this.submitComment}/>
                                <Google userLogin = {this.userLogin}/>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Comments;