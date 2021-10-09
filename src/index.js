import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import Trips from "./Components/Trips";
import MapDraw from "./Components/MapDraw";
//import PROPS from "./values/demo";
//import * as serviceWorker from "./serviceWorker";
class App extends React.Component {
  render() {
    //return <Trips {...PROPS} />;
    return <MapDraw />;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
