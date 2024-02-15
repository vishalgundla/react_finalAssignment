import React, { Component } from "react";
import classes from "./BarChart.module.css";
import { HorizontalBar } from "react-chartjs-2";

class BarChat extends Component {
  state = {
    featured: "",
    latest: "",
    months: "",
    popular: "",
    performance: "",
  };
  componentDidMount() {
    let chartBarpage =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let chartPerformance = chartBarpage["dasbhoardPage"]["performance"];
    console.log(chartPerformance);
    this.setState({
      performance: chartPerformance,
    });
  }

  render() {
    const data = {
      labels: Object.keys(this.state.performance),
      datasets: [
        {
          label: "# of Hits",
          data: Object.values(this.state.performance),
          backgroundColor: [
            "#4ED6B8",
            "#3889FC",
            "#A8D582",
            "#D7D768",
            "#9D66CC",
            "#F7604D",
            "#DB9C3F",
          ],
          borderColor: "rgb(247,96,77)",

          barThickness: 4,
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
      scales: {
        xAxes: [
          {
            display: true,

            ticks: {
              fontColor: "#fff",
              fontSize: 12,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Hits",
              fontColor: "#fff",
              fontSize: 12,
            },
            ticks: {
              fontColor: "#fff",
              fontSize: 12,
            },
          },
        ],
      },
    };

    return (
      <div className={classes.tm_bg_primary_dark}>
        <h2 className={classes.latest}>Performance</h2>
        <HorizontalBar data={data} options={options} />
      </div>
    );
  }
}

export default BarChat;
