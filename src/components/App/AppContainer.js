import { connect } from "react-redux";

import App from "./App";

const mapStateToProps = state => ({
  active: state.control.initialized
});

export default connect(mapStateToProps)(App);
