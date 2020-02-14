import React, { Component } from 'react';
import history from './../history';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom'

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email : '', 
            password: '',
            redirect: false,
            token: ''
        }
    }

    handleChange = (e) => 
    this.setState({
        [e.target.name] : e.target.value
    })

    loginUser = async (e) => {
        e.preventDefault()
        console.log("state", this.state)
        try {
            const { email, password, token } = this.state
            const data = { email, password } 

            let result = await axios({
                method: 'POST', 
                url: `http://localhost:5000/login`, 
                data,
                // headers: { 
                //     Authorization: `Bearer ${axios.defaults.headers.common}` 
                // }
            })
            console.log("result1", result)

            if (result.status === 200) {
                const token = result.data.token
                console.log("tok", token)
                localStorage.setItem('token', token)
                this.props.history.push('/kpi-table');
            } else {
              const error = new Error(result.error);
              throw error;
            }
         
            

        // if(result.data.message === "Auth successful"){
        //    this.setState({redirect: true});
        // }
        } catch(err) { console.log("error", err) }
    }

    render() { 
        // const {redirect} = this.state;
        // if(redirect){
        //     return <Redirect to={"/kpi-table"}/>
        // }          
        return ( 
            <div>
                <div className="sidenav">
                    <div className="login-main-text">
                        <h2>LOGIN...... </h2> 
                        <p>Please Login or Register to access your KPIs</p>
                    </div>
                </div>
                <div className="main">
                    <div className="col-md-6 col-sm-12">
                    <div className="login-form">
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
                            <button type="submit" className="btn btn-black" onClick={this.loginUser}>
                                    Login
                            </button>
                            {/* <Link to="/kpi-table" target="_self"></Link> */}
                            <button type="submit" className="btn btn-secondary"  onClick={() => history.push('/register-user')}>Register</button>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default LoginUser;