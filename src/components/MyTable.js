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
            loading: false
        }

        componentDidMount() {
            this.setState({loading: true})
            this.getkpis();
            this.getPercent();
        }

        getkpis = async (e) => {
            try{
            let result = await axios.get('http://127.0.0.1:5000/kpis');
            this.setState({ 
                loading: false,
                kpis : result.data
            });  
            } catch(e) {
            console.log(e)
            }
        }

        getPercent = () => {
            // var sum = 0;
            // for(var i=0; i < this.state.kpis.length; i++){
            //     sum += this.state.kpis[i].percent
            // }
            // var mean = sum/this.state.kpis.length
            // return mean.toFixed(1);

            var sum = 0;
            for(var i=0; i < this.state.kpis.length; i++){
                sum += this.state.kpis[i].rate
            }
            
            var mean = sum/this.state.kpis.length
            return mean.toFixed(1);
        }

        getId(kpi) {
            this.setState({
                oneKPI: kpi
            })
            console.log("object", kpi)
        }

        handleDelete = async (kpi) => {
            console.log("delete", kpi)
            try {
                await axios({ method : 'DELETE', url: `http://localhost:5000/kpis/${kpi._id}`});
            } catch(e) { console.log(e) }        
        }

        renderTableData() {
            return this.state.kpis.map((kpi, i) => {
               const { task, start_date, supposed_end_date, rate, stage, end_date, status, percent } = kpi
               return (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{task}</td>
                    <td>
                        <Moment format="D MMM YYYY">{start_date}</Moment>
                    </td>
                    <td><Moment format="D MMM YYYY">{supposed_end_date}</Moment></td>
                    {/* <td>{rate}</td> */}
                    {/* <td>{stage}</td> */}
                    <td>{status}</td>
                    {/* <td>{percent}</td> */}
                    <td>
                        <a 
                            onClick = {() => this.getId(kpi)}
                            className="" data-toggle="modal"
                            href="#exampleModal">
                            <img src={update} alt="" width="20px" />
                        </a>                        
                        <UpdateForm 
                            kpi = {this.state.oneKPI}
                        />
                        <a 
                            onClick={() => this.handleDelete(kpi)}
                            // href="#g"
                        >
                            <img src={bin} alt="" width="20px" />
                        </a>
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
            return ( 
                <div className="">
                    <div>
                        <KPIForm 
                            kpis = {this.state.kpis}
                            kpis_length={this.state.kpis.length}
                            getPercent = {this.getPercent()}
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
                                {/* <th>Actual Stage</th> */}
                                {/* <th>Stage</th> */}
                                <th>Status</th>
                                {/* <th>Percent</th> */}
                                <th>Action</th>
                                <th>End Date</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.loading ? <p>loading...</p> : this.renderTableData() }
                        </tbody>
                    </table>
                </div>
            );
        }
    }
 
export default MyTable;