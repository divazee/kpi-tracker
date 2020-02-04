import React, { Component } from 'react';
import KPIForm from './KPIForm';
import axios from 'axios';
import Moment from 'react-moment'

    class MyTable extends Component {
        state = {
            kpis : [],
            percentages: [],
            sum: 0
        }

        componentDidMount() {
        this.getkpis();
        }

        getkpis = async (e) => {
            try{
            let result = await axios.get('http://127.0.0.1:5000/kpis');
            // console.log(result);
            this.setState({ kpis : result.data });  
            } catch(e) {
            console.log(e)
            }
        }

        // getPercent = () => {
        //     for(var i=0; i < this.state.kpis)

        // }

        handleChange = (e) => {
            const {name, value} = e.target
            this.setState({ [name]: value })
            console.log("object", this.state.kpis.task)
        }

        renderTableData() {
            return this.state.kpis.map((kpi, i) => {
               const { task, start_date, supposed_end_date, stage, end_date, status, percent } = kpi
            //    console.log("commmkpi", kpi)
               return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{task}</td>
                    <td>
                        <Moment format="D MMM YYYY">{start_date}</Moment>
                    </td>
                    <td><Moment format="D MMM YYYY">{supposed_end_date}</Moment></td>
                    <td>
                        <select 
                            className="form-control badge"
                            name="stage"
                            value={stage}
                            onChange={this.handleChange}
                            >
                            <option>-- Not Started --</option>
                            <option value="Requirement Gathering">Requirement Gathering</option>
                            <option value="In Production">In Production</option>
                            <option value="Rounding up">Rounding up</option>
                            <option value="Complete">Complete</option>
                        </select>                        
                    </td>
                    <td>
                        <select
                            className="form-control badge mx-2"
                            name="status"
                            value={status}
                            onChange={this.handleChange}
                            >
                                {/* <option>-- Not Started --</option> */}
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                        </select>
                    </td>
                    <td>
                        <select 
                            className="form-control badge mx-2"
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
                    </td>
                    <td>
                        <input 
                            type="date" name="end_date" defaultValue={end_date}
                        />
                    </td>
                </tr>
                )
            })
        }
        
        render() {
            return ( 
                <div className="">
                    <div>
                        <KPIForm 
                            kpis = {this.state.kpis}
                            // kpiPercent = { this.state.kpis}
                            handleChange = { this.handleChange }
                            averagePercent={this.state.kpis.length}
                        />
                    </div>
                    <table className="table table-hover table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>Start Date</th>
                                <th>Supposed End Date</th>
                                <th>Stage</th>
                                <th>Status</th>
                                <th>Percent</th>
                                <th>End Date</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
 
export default MyTable;