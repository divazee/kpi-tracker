import React from 'react';
import '../stylesheets/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <div>
            <div className="slideshow-text">
                <h1>KPI Tracker</h1>
                <Link to="/login-user" className="btn btn-lg btn-danger" target="_self">View KPIs</Link>
            </div>            
            <ul className="slideshow">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>

        </div>
    );
}
 
export default Home;