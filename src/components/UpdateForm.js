import React, { Component } from 'react';
import Moment from 'react-moment';

class UpdateForm extends Component {
  state = {  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({ [name]: value })    
    console.log("names", name)
    console.log("namev", value)
    console.log("namev", this.state.task)
}

  render() { 
    const { kpi, handleChange } = this.props
    const { task, start_date, supposed_end_date, stage, status, percent, end_date, _id } = kpi;
    // console.log("from update",_id);
    console.log("get kpi from update", this.props.kpi)
    return (        
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Update KPI</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">cvbn: {start_date}mm
              {<Moment format="D MMM YYYY">{start_date}</Moment>}
                <form onSubmit={() => console.log("on submit")}>
                {/* <form onSubmit={props.updateField}> */}
                                    <div className="form-group">
                                        <input 
                                        type="text"
                                        className="form-control" 
                                        // placeholder="Task" 
                                        name="task"              
                                        value={task}
                                        onChange={this.handleChange}
                                         />
                                    </div>
                                    <div  className="d-flex">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm"
                                            name="start_date"
                                            value={<Moment format="D MMM YYYY">{start_date}</Moment>}
                                            // onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-1">
                                            <label>Supposed End Date</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm" 
                                            name="supposed_end_date"
                                            value={supposed_end_date}
                                            // onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="form-group ml-1">
                                            <label>Percent</label>
                                            <select 
                                                className="form-control-sm"
                                                name="percent"
                                                value={percent}
                                                // onChange={this.handleChange}
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
                                                onChange={handleChange}
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
                                                // onChange={this.handleChange}
                                                >
                                                    <option>-- Status --</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Progress">In Progress</option>
                                                    <option value="Done">Done</option>
                                            </select>
                                    </div>
                                    <div className="modal-footer mt-2">
                                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                        <button 
                                          type="click" 
                                          className="btn btn-primary" 
                                          // id={_id}
                                          // onClick={() => {console.log(this.props.kpis._id)}}
                                          >Save changes</button>
                                    </div>
                                </form>
              </div>
            </div>
          </div>
        </div>        
     );
}
}
export default UpdateForm;