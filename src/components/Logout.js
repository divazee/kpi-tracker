import React, { useState } from 'react';
import logout from "../images/logout.png";
import { Redirect } from "react-router-dom";

function Logout() {
    const [Logout, setLogout] = useState(false);

    const handleLogout = () => {
        localStorage.clear()
        setLogout(true)
    }

    if (Logout) return <Redirect to = "/login-user" /> 

    return ( 
        <span className="mt-2">
            <img 
                src={logout} 
                className="" 
                onClick={handleLogout} 
                style={{ cursor: 'pointer' }} 
                alt="Logout" />
        </span>
    );
}
 
export default Logout;