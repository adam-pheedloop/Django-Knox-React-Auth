import React from 'react'

function Logout({setLoggedIn}) {

    const logout = () =>{
        window.localStorage.token = null
    }
    window.addEventListener('load', logout) 
    return (
        <div>
                    You have now been logged out
        </div>
    )
}

export default Logout
