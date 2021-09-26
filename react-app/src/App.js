// import logo from './logo.svg';
import './App.css';
import Search from "./components/search";
import Rating from "./components/rating";
import Comments from "./components/comments";
// import Submit from "./components/submit";
import Google from "./components/google";
import React from 'react';

function App() {
  return (
    // <React.Fragment>
    <div className="App">
      <header className="App-header">
        <Search />
        <Rating />
        <Comments />
        {/* <Submit /> */}
        <Google />
      </header>
    </div>
    // </React.Fragment>
  );
}

export default App;
