import React, { Component } from "react";
import "./App.css";

import Header from "./components/Header/Header";

import Home from "./pages/Home/Home";
import OauthLoading from "./pages/Auth/OauthLoading";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Register from "./pages/Auth/Register";
import Private from "./pages/Private/Private";
import Welcome from "./pages/Welcome/Welcome";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { auth } from "./actions";
import myApp from "./reducers";

let store = createStore(myApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {
  componentDidMount() {
    this.props.loadUser();
  }

  PrivateRoute = ({ component: ChildComponent, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (this.props.auth.isLoading) {
            return <em>Loading...</em>;
          } else if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />;
          } else {
            return <ChildComponent {...props} />;
          }
        }}
      />
    );
  };

  render() {
    let { PrivateRoute } = this;
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/loading" component={OauthLoading} />
          <Route exact path="/logout" render={props => <Logout {...props} />} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/welcome" component={Welcome} />
          <PrivateRoute exact pate="/private" component={Private} />
        </Switch>
      </Router>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => {
      return dispatch(auth.loadUser());
    }
  };
};

let RootContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainerComponent);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
