import React, { Component } from "react";
import KPIForm from "./KPIForm";
import axios from "axios";
import Moment from "react-moment";
import bin from "../images/bin.png";
import update from "../images/update.png";
import UpdateKPI from "./UpdateKPI";
import DeleteKPI from "./DeleteKPI";
import Logout from "./Logout";

class MyTable extends Component {
  state = {
    kpis: [],
    oneKPI: {},
    loading: false,
    firstname: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.getkpis();
    this.getPercent();
    this.getLoggedUser();
  }

  getLoggedUser = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: `http://127.0.0.1:5000/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log("object77777", result);
      this.setState({
        firstname: result.data.first_name
      });
    } catch (e) {
      console.log("e............", e);
    }
  };

  getkpis = async e => {
    try {
      let result = await axios({
        method: "GET",
        url: `http://127.0.0.1:5000/kpis`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        // body: {
        //      userId:
        // }
        // json: true,
      });

      // if (result.data.token) {
      console.log("object", result);
      this.setState({
        loading: false,
        kpis: result.data
      });
      // }
    } catch (e) {
      console.log("e............", e);
    }
  };

  getPercent = () => {
    var sum = 0;
    for (var i = 0; i < this.state.kpis.length; i++) {
      sum += this.state.kpis[i].rate;
    }

    var mean = sum / this.state.kpis.length;
    return mean.toFixed(1);
  };

  getId(kpi) {
    this.setState({
      oneKPI: kpi
    });
  }

//   handleDate = e => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });
//     //   console.log("reeobject", date)
//   };

  renderTableData() {
    return this.state.kpis.map((kpi, i) => {
      const { task, start_date, supposed_end_date, end_date, status } = kpi;
      return (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{task}</td>
          <td>
            <Moment format="D MMM YYYY">{start_date}</Moment>
          </td>
          <td>
            <Moment format="D MMM YYYY">{supposed_end_date}</Moment>
          </td>
          <td>{status}</td>
          <td>
            <a
              onClick={() => this.getId(kpi)}
              className="mr-2"
              data-toggle="modal"
              href="#exampleModal"
            >
              <img src={update} alt="" width="20px" />
            </a>
            <UpdateKPI kpi={this.state.oneKPI} />
            <a
              onClick={() => this.getId(kpi)}
              // onClick={() => this.handleDelete(kpi)}
              className="btn btn-sm btn-warning p-0 ml-2"
              data-toggle="modal"
              href="#deleteModal"
            >
              <img src={bin} alt="" width="20px" />
            </a>
            <DeleteKPI kpi={this.state.oneKPI} />
          </td>
          {/* <td>
            <input
              type="date"
              name="end_date"
              value={end_date}
              onChange={this.handleDate}
            />
          </td> */}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          {/* Current User:  */}
          <span className="user"> {this.state.firstname} </span>
          <Logout />
          <KPIForm
            // kpis = {this.state.kpis}
            kpis_length={this.state.kpis.length}
            getPercent={this.getPercent()}
          />
        </div>
        <table className="table table-hover table-bordered mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Start Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
              {/* <th>End Date</th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <p>Loading Data...</p>
                </td>
              </tr>
            ) : (
              this.renderTableData()
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MyTable;
