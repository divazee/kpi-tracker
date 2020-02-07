import React, { Component } from 'react';
import axios from 'axios'

class KPIForm extends Component {
    state = {}

    handleSubmit = async (e) => {
        // e.preventDefault();
        const { task, start_date, supposed_end_date, stage, status, percent, end_date } = this.state;
    
        // API call
        const data = { task, start_date, supposed_end_date, stage, status, percent, end_date };
        console.log(data);
        try {
            await axios({ method : 'POST', url: 'http://localhost:5000/kpis', data });
        } catch(e) { console.log(e) }
    }
    
    handleChange = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    render(){
        const { task, start_date, supposed_end_date, stage, status, percent, end_date } = this.state;
        return ( 
            <div>
                <div className="flex-wrapper">
                    <div className="single-chart">
                        <svg viewBox="0 0 36 36" className="circular-chart pink">
                        <path className="circle-bg"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                            strokeDasharray={this.props.averagePercent}
                            // strokeDasharray="26, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.35" className="percentage">{ this.props.averagePercent }%</text>
                        {/* <text x="18" y="20.35" className="percentage">30%</text> */}
                        </svg>
                    </div>
                </div>

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
                                        <input 
                                        type="text"
                                        className="form-control" 
                                        placeholder="Task" 
                                        name="task"              
                                        value={task}
                                        onChange={this.handleChange} />
                                    </div>
                                    <div  className="d-flex">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm"
                                            name="start_date"
                                            value={start_date}
                                            onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-3">
                                            <label>Supposed End Date</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm" 
                                            name="supposed_end_date"
                                            value={supposed_end_date}
                                            onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-3">
                                            <label>Percent</label>
                                            <select 
                                                className="form-control-sm"
                                                name="percent"
                                                value={percent}
                                                onChange={this.handleChange}
                                                >
                                                <option value="0">0%</option>
                                                <option value="25">25%</option>
                                                <option value="50">50%</option>
                                                <option value="75">75%</option>
                                                <option value="100">100%</option>
                                            </select>   
                                        </div>
                                    </div>
                                    <div  className="d-flex">
                                            <select 
                                                className="form-control"
                                                name="stage"
                                                value={stage}
                                                onChange={this.handleChange}
                                                >
                                                <option>-- Stage --</option>
                                                <option value="Requirement Gathering">Requirement Gathering</option>
                                                <option value="In Production">In Production</option>
                                                <option value="Rounding up">Rounding up</option>
                                                <option value="Complete">Complete</option>
                                            </select>
                                            <select 
                                                className="form-control mx-2"
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
