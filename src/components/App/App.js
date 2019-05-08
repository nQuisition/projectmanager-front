import React, { Component } from "react";
import logo from "./logo.svg";
import * as styles from "./App.module.scss";

import UserFormsContainer from "../Forms/UserFormsContainer";
import DashboardContainer from "../Dashboard/DashboardContainer";

class App extends Component {
  componentDidMount() {
    console.log(this.props.location);
    this.unlisten = this.props.history.listen((location, action) => {
      console.log(location, action);
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    if (!this.props.active) {
      return null;
    }
    return (
      <div className="app">
        <UserFormsContainer />
        <DashboardContainer match={this.props.match} />
      </div>
    );
  }
}

export default App;
