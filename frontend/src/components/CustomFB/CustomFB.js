import React from "react";

function CustomFB(props) {
  // Facebook APP ID from dev dashboard, redirect uri, and state param (basically a CSRF token)
  const appId = "209139310246667";
  const redirectUri = "http://localhost:3000/login/loading";
  const stateParam = { Foo: 12345, Bar: 98765 };
  return (
    <a
      href={`https://www.facebook.com/v5.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${stateParam}`}
    >
      <button
        sytle={{
          padding: "10px",
          background: "blue",
          color: "white",
          borderRadius: "10px"
        }}
      >
        Login With Facebook
      </button>
    </a>
  );
}

export default CustomFB;
