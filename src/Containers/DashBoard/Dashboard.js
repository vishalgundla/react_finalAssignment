import React, { Component } from "react";
import Linechart from "../../Component/LineChart/LineChart";
import BarChat from "../../Component/BarChart/BarChart";
import Notifications from "../../Component/Notifications/Notifications";
import "./Dashboard.css";
import PieChart from "../../Component/PieChart/PieChart";
import Order from "../../Component/Orders/Order";

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="text-white mt-5 mb-5">
              Welcome back, <b>Admin</b>
            </p>
          </div>
        </div>
        <div className="row tm-content-row">
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <Linechart />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <BarChat />
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 tm-block-col">
            <PieChart />
          </div>
          <Notifications />
          <div className="col-12 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <Order />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
