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
            // percentages: [],
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

        handleChange = async (e) => {
            const {name, value} = e.target
            this.setState({ [name]: value })    
        }

        getId(kpi) {
            // console.log("kpi1", kpi)
            // console.log("object1", this.state.oneKPI)
            this.setState({
                oneKPI: kpi
            })
            // console.log("object2", this.state.oneKPI.task)
            // console.log("kpi1", kpi.task)

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

        // viewForm = (kpi) => {
        //     console.log("kpinnn1", kpi)

        // }

        renderTableData() {
            return this.state.kpis.map((kpi, i) => {
               const { task, start_date, supposed_end_date, stage, end_date, status, percent, _id } = kpi
               return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{_id}</td>
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
                            // onClick={() => this.viewForm(kpi)}
                            className="" data-toggle="modal"
                            href="#exampleModal">
                            <img src={update} alt="" width="20px" />
                        </button>                        
                        <UpdateForm 
                            // kpi = {this.state.kpis}
                            kpi = {this.state.oneKPI}
                            
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