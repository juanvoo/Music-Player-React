//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

// include your styles into the webpack bundle
import "../styles/index.css";
import Player from "./component/home.jsx";

//import your own components
import Home from "./component/home.jsx";

//render your react application
ReactDOM.render( < Player / > , document.querySelector("#app"));