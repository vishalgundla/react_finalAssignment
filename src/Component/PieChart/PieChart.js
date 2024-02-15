import React, { Component } from "react";
import classes from "./Pie.module.css";

import { Pie } from "react-chartjs-2";
class Piechart extends Component {
  state = {
    paikey: "",
    paivalue: "",
  };
  componentDidMount() {
    let paichartpage =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let paichartfeatured = paichartpage["dasbhoardPage"]["storage"];
    let paichartlable = paichartpage["dasbhoardPage"]["storage"];
    this.setState({
      paikey: paichartfeatured,
      paivalue: paichartlable,
    });
  }
  render() {
    const mydata = {
      labels: Object.keys(this.state.paikey),
      datasets: [
        {
          data: Object.values(this.state.paikey).reverse(),
          backgroundColor: [
            "rgba(247,96,77,1)",
            "rgba(78,214,184, 1)",
            "rgba(168,213,130, 1)",
          ],
        },
      ],
    };
    const options = {
      legend: {
        display: true,
        position: "top",
        labels: {
          fontColor: "#fff",
        },
      },
    };
    return (
      <div className={classes.tm_bg_primary_dark}>
        <h2 className={classes.storage}>Storage Information</h2>
        <Pie data={mydata} options={options} />
      </div>
    );
  }
}

export default Piechart;
