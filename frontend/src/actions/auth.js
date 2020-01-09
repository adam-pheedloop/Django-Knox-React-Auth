import main_url from '../config'

export const loadUser = () => {
    return (dispatch, getState) => {
      dispatch({type: "USER_LOADING"});
  
      const token = getState().auth.token;
  
      let headers = {
        "Content-Type": "application/json",
      };
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
      return main_url.get("users/api/user/", {headers, })
        .then(res => {
          if (res.status < 500) {
              return {status: res.status, data: res.data};
            }else {
            console.log("Server Error!");
            throw res;
          }
        }).catch(res =>{
                dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                throw res.data;
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'USER_LOADED', user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const login = (username, password) => {
    return (dispatch) => {
      let headers = {"Content-Type": "application/json"};
      let body = {username, password};
  
      return main_url.post("users/api/login/", body, {headers: headers})
        .then(res => {
          if (res.status < 500) {
              return {status: res.status, data: res.data};
            }
            else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
            window.location.href="/"
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "LOGIN_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const register = (username, password, first_name, last_name) => {
    return (dispatch) => {
      let headers = {"Content-Type": "application/json"};
      let body = {username, password, first_name, last_name};
  
      return main_url.post("users/api/register/", body, headers)
        .then(res => {
            if (res.status < 500) {
                return {status: res.status, data: res.data};
            }else {
                console.log("Server Error!");
                throw res;
            }
            })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "REGISTRATION_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const logout = () => {
    return (dispatch, getState) => {
      const token = getState().auth.token;
      let body = {}
      let headers = {
        "Content-Type": "application/json",
      };
      console.log(token)
      
      headers["Authorization"] = `Token ${token}`;
      

      return main_url.post("users/api/logout/", body, {headers,})
        .then(res => {
            dispatch({type: 'LOGOUT_SUCCESSFUL'});
            return res.data;
          }).catch(res =>{ 
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          })
    }
  }