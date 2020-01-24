import React, { useEffect } from "react";

function OauthLoading(props) {
  // This function turns url parameters into an object, full disclosure this snippet is from stack overflow
  function getUrlParams(search) {
    let hashes = search.slice(search.indexOf("?") + 1).split("&");
    return hashes.reduce((params, hash) => {
      let [key, val] = hash.split("=");
      return Object.assign(params, { [key]: decodeURIComponent(val) });
    }, {});
  }

  async function validateCode(userCode) {
    // make a post request to the backend with the access code from Facebook, wait for backend to validate that code.
    const response = await fetch(
      "http://localhost:8000/users/api/oauth/facebook/",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ code: userCode })
      }
    );
    return await response.json();
  }

  useEffect(() => {
    // on component load, if there is a search parameter, parse it, and call validate code with the code
    if (props.location.search) {
      const code = getUrlParams(props.location.search).code;
      console.log(code);
      validateCode(code).then(data => {
        //TODO, store user/ token in state and redirect on success
        console.log(data);
      });
      // TODO handle errors
    }
  }, []);
  return <div>Loading</div>;
}

export default OauthLoading;
