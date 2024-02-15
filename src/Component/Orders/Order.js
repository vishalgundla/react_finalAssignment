import React, { Component } from "react";
import classes from "./Order.module.css";

class Order extends Component {
  state = {
    orderdata: [],
  };
  getorderdata = () => {
    let orderlist =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let orderlistdata = orderlist["dasbhoardPage"]["orders"];
    let orderdatamap = orderlistdata.map((item) => {
      return this.displayorderdata(item);
    });
    return orderdatamap;
  };
  getstatusclasslink = (status) => {
    switch (status) {
      case "Moving":
        return classes.moving;
        break;
      case "Pending":
        return classes.Pending;
        break;
      case "Cancelled":
        return classes.cancelled;
        break;
      case "Delivered":
        return classes.delivered;
        break;
      default:
    }
  };
  displayorderdata = (data) => {
    let className = this.getstatusclasslink(data.status);
    return (
      <tr>
        <th className={classes.thbdy}>
          <b>{data.orderNo}</b>
        </th>
        <td className={classes.thbdy}>
          <div className={className}></div>
          {data.status}
        </td>
        <td className={classes.thbdy}>
          <b>{data.operators}</b>
        </td>
        <td className={classes.thbdy}>
          <b>{data.location}</b>
        </td>
        <td className={classes.thbdy}>
          <b>{data.distance}</b>
        </td>
        <td className={classes.thbdy}>{data.startDate}</td>
        <td className={classes.thbdy}>{data.deliveryDate}</td>
      </tr>
    );
  };
  render() {
    return (
      <div>
        <h2 className={classes.tm_block_title}>Orders List</h2>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tbody}>
              <th className={classes.thbdy}>ORDER NO.</th>
              <th className={classes.thbdy}>STATUS</th>
              <th className={classes.thbdy}>OPERATORS</th>
              <th className={classes.thbdy}>LOCATION</th>
              <th className={classes.thbdy}>DISTANCE</th>
              <th className={classes.thbdy}>START DATE</th>
              <th className={classes.thbdy}>EST DELIVERY DUE</th>
            </tr>
          </thead>
          <tbody className={classes.tbody}>{this.getorderdata()}</tbody>
        </table>
      </div>
    );
  }
}

export default Order;
