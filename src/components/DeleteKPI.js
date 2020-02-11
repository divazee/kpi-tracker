import React from 'react';
import axios from 'axios'

class DeleteKPI extends React.Component {
    state = {  }

    handleDelete = async() => {
        console.log("delete2", this.props.kpi)
        try {
            await axios({ method : 'DELETE', url: `http://localhost:5000/kpis/${this.props.kpi._id}`});
            window.location.reload();
        } catch(e) { console.log(e) }        
    }

    render() { 
    return ( 
        <div>
            <div className="modal fade bd-example-modal-lg" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            Delete Task???
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-sm btn-danger" onClick={this.handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
     );
    }
}
 
export default DeleteKPI;