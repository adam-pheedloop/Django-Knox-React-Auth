import React, { useState } from 'react'
import {connect} from "react-redux";
import { Link } from 'react-router-dom'

import {auth} from "../../actions";

function Login(props) {
    const [formData, setFormData] = useState({})

    const handleLogin = (event) => {
        event.preventDefault()
        props.login(formData.username, formData.password)
    }


    
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleLogin}>
                <br/>
                <label htmlFor='email'><b> Email: </b>
                <input type='text' value={formData.username} placeholder = 'Email' name='email' onChange={e => setFormData({...formData, username : e.target.value})} required/>
                </label>
                <br/>
                <label htmlFor='password'><b> Password: </b></label>
                <input type='password' value={formData.password} placeholder = 'Password' name='password' onChange={e => setFormData({...formData, password : e.target.value})} required/>
                <br/>
                <input type='submit' value='Login'/>
            </form>
                <Link to='/register'>
                <button type='button'>Dont have an account? Register for free today!</button>
                </Link>
        </div>
    )
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
      errors = Object.keys(state.auth.errors).map(field => {
        return {field, message: state.auth.errors[field]};
      });
    }
    return {
      errors,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: (username, password) => {
        return dispatch(auth.login(username, password));
      }
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);