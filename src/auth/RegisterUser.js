import React from 'react';
import history from './../history';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
         }
    }

    handleChange = (e) => 
    this.setState({
        [e.target.name] : e.target.value
    })

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log("state2", this.state)
        try {                
            const { email, password } = this.state
            const data = { email, password } 
            let result = await axios({method: 'POST', url: `http://localhost:5000/register`, data})

            console.log("result1", result)

            
            // if (result.status === 201) {
            //     this.props.history.push('/kpi-table');
            // } else {
            //   const error = new Error(result.error);
            //   throw error;
            // }

        } catch(err) { console.log("error", err) }
    }

    render() { 
        // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        // console.log("object", AUTH_TOKEN)
        return ( 
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>REGISTER </h2> 
                    {/* <p>Please Login or Register to access your KPIs</p> */}
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                <div className="login-form">
                    {/* <form onSubmit={this.handleSubmit}> */}
                    <form>
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="email" 
                                placeholder="Email"
                                required 
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                            type="password" 
                            className="form-control"
                            name="password" 
                            placeholder="Password"
                            required
                            onChange={this.handleChange} />
                        </div>
                        {/* <button type="submit" className="btn btn-black" onClick={() => history.push('/login-user')}>Login</button> */}
                        {/* <button type="submit" className="btn btn-secondary" onClick={() => history.push('/kpi-table')}>Register</button> */}
                        
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary" onClick={this.handleSubmit}>Register</button>
                            <p>
                                Want to log in???
                                <Link to="/login-user" target="_self">
                                    <small> Login</small>
                                </Link>
                            </p>  
                        </div>                      
                    </form>
                </div>
                </div>
            </div>
        </div>
     );
}}
 
export default RegisterUser;