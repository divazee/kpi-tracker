import React, { Component } from 'react';
import KPIForm from './KPIForm';
import axios from 'axios';
import Moment from 'react-moment';
import bin from "../images/bin.png";
import update from '../images/update.png'
import UpdateForm from './UpdateForm';

    class MyTable extends Component {
        state = {
            kpis : [],
            oneKPI: {},
            sum: 0
        }

        componentDidMount() {
        this.getkpis();
        this.getPercent();
        }

        getkpis = async (e) => {
            try{
            let result = await axios.get('http://127.0.0.1:5000/kpis');
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
            return mean;
        }

        getId(kpi) {
            this.setState({
                oneKPI: kpi
            })
            console.log("object", kpi)

            // const { task, start_date, supposed_end_date, stage, status, percent, _id, end_date } = kpi;
    
            // const data = { task, start_date, supposed_end_date, stage, status, percent, _id, end_date };
            // console.log("data1", data);
            // // console.log('data, da,', this.state.kpis);
            // try {
            //     let result = await axios({ method : 'PUT', url: `http://localhost:5000/kpis/${kpi._id}` });
            //     this.setState({ kpi: result.data})

            //     console.log("kpi4", kpi)
            // } catch(e) { console.log(e) }
        }

        renderTableData() {
            return this.state.kpis.map((kpi, i) => {
               const { task, start_date, supposed_end_date, stage, end_date, status, percent } = kpi
               return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{task}</td>
                    <td>
                        <Moment format="D MMM YYYY">{start_date}</Moment>
                    </td>
                    <td><Moment format="D MMM YYYY">{supposed_end_date}</Moment></td>
                    <td>{stage}</td>
                    <td>{status}</td>
                    <td>{percent}</td>
                    <td>
                        <button 
                            onClick = {() => this.getId(kpi)}
                            className="" data-toggle="modal"
                            href="#exampleModal">
                            <img src={update} alt="" width="20px" />
                        </button>                        
                        <UpdateForm 
                            kpi = {this.state.oneKPI}
                            // kpi = {kpi}
                        />
                        
                        <img src={bin} alt="" width="20px" />
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
            console.log("onekpi", this.state.oneKPI)
            // console.log("kpis", this.state.kpis)
            return ( 
                <div className="">
                    <div>
                        <KPIForm 
                            kpis = {this.state.kpis}
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
                                <th>Action</th>
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