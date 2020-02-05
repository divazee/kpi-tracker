import React from 'react';

const UpdateForm = (props) => {
    const { task, start_date, supposed_end_date, stage, status, percent, end_date } = props.kpis;
    return (        
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update KPI</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                                    <div className="form-group">
                                        <input 
                                        type="text"
                                        className="form-control" 
                                        placeholder="Task" 
                                        name="task"              
                                        value={task}
                                        // onChange={this.handleChange}
                                         />
                                    </div>
                                    <div  className="d-flex">
                                        <div className="form-group">
                                            <label>Start Date</label>
                                            <input 
                                            type="date" 
                                            className="form-control-sm"
                                            name="start_date"
                                            value={start_date}
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
                                                // onChange={this.handleChange}
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
                                    <div class="modal-footer mt-2">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-primary">Save changes</button>
                                    </div>
                                </form>
              </div>
            </div>
          </div>
        </div>        
     );
}
 
export default UpdateForm;