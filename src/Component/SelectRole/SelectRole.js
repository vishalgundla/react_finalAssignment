import React, { Component } from "react";
import classes from "./SelectRole.module.css";
import AccountProfilePic from "../../Component/AccountProfilePic/AccountProfilePic";
import AccountSetting from "../../Component/AccountSettings/AccountSettings";
class SelectRole extends Component {
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

  render = () => {
    console.log(this.props);
    return (
      <div>
        <div className={classes.MainContainer}>
          <div className={classes.AccountSelection}>
            <div className={classes.AccountColumnFlex}>
              <h2 className={classes.AccountTitle}> List of Accounts</h2>
              <p className={classes.AccountText}>Accounts</p>
              <select
                className={classes.CustomSelect}
                onChange={(e) => {
                  this.props.onUserSelect(e.target.value);
                }}
              >
                <option className={classes.Option} value="0">
                  Select account
                </option>
                <option className={classes.Option} value="Admin">
                  Admin
                </option>
                <option className={classes.Option} value="Editor">
                  Editor
                </option>
                <option className={classes.Option} value="Merchant">
                  Merchant
                </option>
                <option className={classes.Option} value="Customer">
                  Customer
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className={classes.RowProfileAccount}>
          <div className={classes.ProfilePic}>
            <AccountProfilePic
              ChangeAvatar={this.state.Accountkeys}
              Accountvalue={this.state.Accountvalue}
            />
          </div>
          {/* <AccountSetting currentUser={this.state.currentUser}/> */}
          <AccountSetting
            ChangeAvatar={this.state.Accountkeys}
            Accountvalue={this.state.Accountvalue}
          />
        </div>
      </div>
    );
  };
}

export default SelectRole;
