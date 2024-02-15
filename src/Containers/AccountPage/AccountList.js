import React, { Component } from "react";
import classes from "./AccountList.module.css";
import ChangeAvatar from "./ChangeAvatar";
import AccountSettings from "./AccountSettings";
class AccountList extends Component {
  state = {
    Accountkeys: {},
    Accountvalue: "",
  };
  handlechange = (e) => {
    this.state.Accountvalue = e.target.value;

    if (this.state.Accountvalue === "") {
      this.setState({
        Accountkeys: {
          name: "",
          email: "",
          phone: "",
          profilePic: "",
          password: "",
        },
        Accountvalue: this.state.Accountvalue,
      });
    } else {
      let acctlist =
        localStorage.getItem("accountdata") === null
          ? []
          : JSON.parse(localStorage.getItem("accountdata"));
      let acctdata = acctlist["accountsPage"]; // list accountpage data
      let Accountkeys = acctdata[this.state.Accountvalue]; // Selected dropdown account id data

      this.setState({
        Accountkeys: Accountkeys,
        Accountvalue: this.state.Accountvalue,
      });
    }
  };
  render() {
    return (
      <div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12">
              <div className={classes.tm_bg_primary_dark}>
                <h2 className={classes.tm_block_title}>List of Accounts</h2>
                <p className={classes.text_white}>Accounts</p>
                <select
                  className={classes.custom_select}
                  onChange={this.handlechange}
                >
                  <option value=""> Select account</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Merchant">Merchant</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </div>
          </div>

          <div className={classes.tm_content_row}>
            <ChangeAvatar
              ChangeAvatar={this.state.Accountkeys}
              Accountvalue={this.state.Accountvalue}
            />
            <AccountSettings
              AccountSettings={this.state.Accountkeys}
              Accountvalue={this.state.Accountvalue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AccountList;
