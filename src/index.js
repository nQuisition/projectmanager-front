import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import createSagaMiddleware from "redux-saga";

import "./index.scss";
import AppContainer from "./components/App/AppContainer";
import rootReducer from "./redux/reducers";
import rootSaga from "./redux/sagas";
import { appInit } from "./redux/control/controlActions";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, enhancer);
sagaMiddleware.run(rootSaga);

store.dispatch(appInit());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
