import React, { Component } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";

import MainComponent from "./components/MainComponent";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainComponent />
      </Provider>
    );
  }
}

export default App;
