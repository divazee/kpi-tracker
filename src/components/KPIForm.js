/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import axios from 'axios'
import '../App.css'
 
// const initialState = {
//     task: '',
//     rate: '',
//     taskError: '',
//     rateError: ''
// }

class KPIForm extends Component {
    // state = initialState;
    state = {
        task: '',
        rate: '',
        taskError: '',
        rateError: ''
    }

    validate = () => {
        let taskError = '',
            rateError = ''

        if (!this.state.task || this.state.task.length < 5) {
            taskError = 'Invalid task';
        }

        if (!this.state.rate) {
            rateError = 'Please select the current stage';
        }

        if (taskError || rateError) { 
            this.setState({ taskError, rateError })
            return false;
        }
        return true;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { task, start_date, supposed_end_date, rate, status, end_date } = this.state;
            const data = { task, start_date, supposed_end_date, rate, status, end_date };
            
            const isValid = this.validate();
            if (isValid) {
                await axios({ method : 'POST', url: 'http://localhost:5000/kpis', data });

                // clear form  
                // this.setState(initialState)
                window.location.reload(); 
            } 
        } catch(e) { console.log(e) }            
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    render(){
        const { task, start_date, supposed_end_date, rate, status } = this.state;
        return ( 
            <div className="mt-5">
                {
                    this.props.kpis_length > 0 && 
                    <div className="single-chart">
                        <svg viewBox="0 0 36 36" className="circular-chart pink">
                            <path className="circle-bg"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <path className="circle"
                                strokeDasharray={[this.props.getPercent, 100]}
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                            <text x="18" y="20.35" className="percentage">{ this.props.getPercent }%</text>
                        </svg>
                    </div>                                               
                }  

                {/* <!-- Button trigger modal --> */}
                <div className="text-right">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#kpiModal">
                        Add
                    </button>
                </div>

                {/* <!-- Modal --> */}
                <div className="modal fade" id="kpiModal" tabIndex="-1" role="dialog" aria-labelledby="kpiModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="kpiModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Task:</label>
                                        <input 
                                        type="text"
                                        className="form-control" 
                                        name="task"              
                                        value={task}
                                        onChange={this.handleChange}
                                        required />
                                    </div>
                                    <div>
                                        <strong  style={{color: 'red'}}>{this.state.taskError}</strong>
                                    </div>

                                    <div  className="d-flex">
                                        <div className="form-group">
                                            <label>Start Date:</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm"
                                            name="start_date"
                                            value={start_date}
                                            onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-2">
                                            <label>Supposed End Date:</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm" 
                                            name="supposed_end_date"
                                            value={supposed_end_date}
                                            onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-2">
                                            <label>Status:</label>
                                            <select 
                                                className="form-control-sm"
                                                name="status"
                                                value={status}
                                                onChange={this.handleChange}
                                                >
                                                    <option>-- Status --</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Done">Done</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                      <label>
                                        <input 
                                            type="radio" 
                                            name="rate"
                                            value="0"
                                            checked={rate == "0"}
                                            onChange={this.handleChange}
                                        /> Not Started
                                      </label>
                                      <br />
                                      <label>
                                        <input 
                                            type="radio" 
                                            name="rate"
                                            value="25"
                                            checked={rate == "25"}
                                            onChange={this.handleChange}
                                        /> Requirement Gathering
                                      </label>
                                      <br />
                                      <label>
                                        <input 
                                            type="radio" 
                                            name="rate"
                                            value="50"
                                            checked={rate == "50"}
                                            onChange={this.handleChange}
                                        /> In Production
                                      </label>
                                      <br />
                                      <label>
                                        <input 
                                            type="radio" 
                                            name="rate"
                                            value="75"
                                            checked={rate == "75"}
                                            onChange={this.handleChange}
                                        /> Rounding Up
                                      </label>
                                      <br />
                                      <label>
                                        <input 
                                            type="radio" 
                                            name="rate"
                                            value="100"
                                            checked={rate == "100"}
                                            onChange={this.handleChange}
                                        /> Complete!
                                      </label>
                                    </div>
                                    <div>
                                        <strong  style={{color: 'red', fontSize: '10'}}>{this.state.rateError}</strong>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment" className="col-form-label">
                                            Comment
                                            <small className=""> (optional)</small>:
                                        </label>
                                        <textarea className="form-control" id="comment"></textarea>
                                    </div>
                                    <div className="text-right">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

 
export default KPIForm;
