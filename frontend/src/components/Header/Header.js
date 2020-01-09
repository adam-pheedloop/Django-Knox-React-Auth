import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

import { connect } from 'react-redux';
import {auth} from '../../actions'

function AuthLinks(props){
    console.log(props.user)
        if (props.auth.isAuthenticated){
            return(<span >{props.user.first_name} (<a className="link" onClick={props.logout}>logout</a>)</span>)
        }
        else{
            return(
                <span>
                <Link to="/login" className="link"> Login </Link>
                <Link to="/register" className="link"> Register </Link>
                </span>
            )
        }
}

function Header() {
    
    return (
        <nav className="navbar"> 
            <div className="nav-logo">
                <h3 className="logo">NavBar</h3>
            </div>
            <div className='nav-links'>
                <Link to="/" className="link"> Home </Link>
                <Link to="/private" className="link"> Private </Link>
            </div>
            <div className='nav-auth'>
                <RootContainer />
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
      auth: state.auth,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(auth.logout()),
    }
  }

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(AuthLinks);

export default Header
