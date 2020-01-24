import React from "react";

function GithubButton() {
  return (
    <a href="http://127.0.0.1:8000/oauth/accounts/github/login/?process=login">
      <button>Sign in With Github</button>
    </a>
  );
}

export default GithubButton;
