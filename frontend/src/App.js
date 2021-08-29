import React, { Component } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import MainComponent from "./components/MainComponent";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <MainComponent />
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
