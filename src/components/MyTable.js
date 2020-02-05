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
        this.getPercent();
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

        getPercent = () => {
            var sum = 0;
            for(var i=0; i < this.state.kpis.length; i++){
                sum += this.state.kpis[i].percent
            }
            var mean = sum/this.state.kpis.length
            // console.log("state.kpis", this.state.kpis)
            // console.log("sum", sum)
            console.log("mean", mean)
        }

        handleChange = async (e) => {
            const {name, value} = e.target
            this.setState({ [name]: value })

        //     // const { task, start_date, supposed_end_date, stage, status, percent, end_date } = this.state.kpis;
        //     const { status } = this.state.kpis;
    
        //     // API call
        //     const data = { status };

        //     for(var i=0; i < this.state.kpis.length; i++){
        //         // sum += this.state.kpis[i].percent
        //         // console.log('kpis id', this.state.kpis[i]._id)
        //         console.log('kpis id', e.target.name)
        //     }

        //     // console.log("data", data);
        //     // console.log("handleChange name -", name)
        //     // console.log("handleChange value -", value)
        //     try {
        //        let result = await axios({ method : 'PUT', url: `http://localhost:5000/kpis/${name}`, data });
        //         console.log("data", result);
        //     } catch(e) { console.log(e) }


        // COPIED
            // const { kpis } = this.state;
            // const kpi = kpis[e];
            
            // const newStatus = this.state.kpis.map((kpi, i) => {
            //     if (e === i + 1) {
            //         return {
            //             ...kpi
            //         }
            //     }
            //     return kpi; 
            // })
            // axios.put(`http://localhost:5000/kpis/${kpi.staidtus}`, {...kpi}) 
            // .then(() => {
            //         // console.log(res)
            //         this.setState({ kpis: newStatus})
            //     }
            // ) 
            
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

        // componentDidUpdate(prevProps, prevState) {
        //     if(prevState.this.state.kpis.status !== this.state.kpis.status) {
        //         // const newColor = randomcolor()
        //         // this.setState({color: newColor})
        //         console.log(this.state.kpis.status)
        //         console.log(prevState.this.state.kpis.status)
        //     }
        // }
        
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
                        <button onClick={this.getPercent}>click</button>
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