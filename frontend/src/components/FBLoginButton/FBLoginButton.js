/*global FB*/
import React, { Component } from "react";

class FacebookLoginButton extends Component {
  state = {
    token: ""
  };
  componentDidMount() {
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    window.fbAsyncInit = () => {
      FB.init({
        appId: "209139310246667", //Change with your Facebook app id
        autoLogAppEvents: true,
        xfbml: true,
        version: "v5.0"
      });

      FB.Event.subscribe("auth.statusChange", response => {
        if (response.authResponse) {
          this.checkLoginState();
        } else {
          console.log(
            "[FacebookLoginButton] User cancelled login or did not fully authorize."
          );
        }
      });
    };
  }
  checkLoginState() {
    FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this)
    );
  }

  login() {
    FB.login(this.checkLoginState(), {
      scope: "email"
    });
  }

  statusChangeCallback(response) {
    if (response.status === "connected") {
      this.testAPI();
    } else if (response.status === "not_authorized") {
      console.log(
        "[FacebookLoginButton] Person is logged into Facebook but not your app"
      );
    } else {
      console.log("[FacebookLoginButton] Person is not logged into Facebook");
    }
  }

  testAPI() {
    FB.api(
      "/me?fields=name,email",
      function(response) {
        console.log("[FacebookLoginButton] Successful login for: ", response);
        this.props.backendLogin(response);
      }.bind(this)
    );
  }

  render() {
    return (
      <button
        style={{
          color: "white",
          background: "blue",
          padding: "10px",
          borderRadius: "5px"
        }}
        onClick={() => this.login()}
      >
        <i className="fa fa-facebook" /> Connect with Facebook{" "}
      </button>
    );
  }
}

export default FacebookLoginButton;
