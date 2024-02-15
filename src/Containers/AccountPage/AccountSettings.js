import React, { Component } from "react";
import classes from "./AccountSettings.module.css";

class AccountSettings extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    Phone: "",
    Accountvalue: "",
  };
  handlechange = (e) => {
    // console.log(this.props.Accountvalue);
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };
  shouldComponentUpdate(prevProps) {
    let Accountvalue = this.props.Accountvalue;

    // console.log(prevProps);
    // console.log(Accountvalue);
    if (prevProps.Accountvalue !== this.props.Accountvalue) {
      this.setState({ name: "", email: "", password: "", Phone: "" });
    }
    if (typeof this.props.AccountSettings === "undefined") {
      return false;
    } else {
      return true;
    }
  }

  accountupdate = (e) => {
    e.preventDefault();
    if (
      this.state.name === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      alert("please fill field");
      return false;
    }

    let acctlist =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let acctdata = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.Phone,
      profilePic:
        acctlist["accountsPage"][this.props.Accountvalue]["profilePic"],
    };

    acctlist["accountsPage"][this.props.Accountvalue] = acctdata;
    localStorage.setItem("accountdata", JSON.stringify(acctlist));
    //     this.setState({
    //   name:'',
    //   email:'',
    //   password:'',
    //   Phone:'',

    // })
  };
  componentDidMount() {
    let { email, name, password, phone } = this.props.AccountSettings;
    this.setState({
      name: name,
      email: email,
      password: password,
      phone: phone,
    });
  }
  render() {
    let { email, name, password, phone } = this.props.AccountSettings;

    return (
      <div className={`${classes.tm_col_account_settings}`}>
        <div className={classes.tm_bg_primary_dark}>
          <h2 className={classes.tm_block_title}>Account Settings</h2>
          <form action="" className="row">
            <div className="form-group col-lg-6">
              <label htmlFor="name" className={classes.accountsettinglabel}>
                Account Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className={classes.accountsettingform_control}
                value={this.state.name ? this.state.name : name}
                onChange={this.handlechange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="email" className={classes.accountsettinglabel}>
                Account Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={classes.accountsettingform_control}
                value={this.state.email ? this.state.email : email}
                onChange={this.handlechange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="password" className={classes.accountsettinglabel}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={classes.accountsettingform_control}
                value={this.state.password ? this.state.password : password}
                onChange={this.handlechange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label
                htmlFor="password2"
                className={classes.accountsettinglabel}
              >
                Re-enter Password
              </label>
              <input
                id="password2"
                name="password2"
                type="password"
                className={classes.accountsettingform_control}
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="phone" className={classes.accountsettinglabel}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={classes.accountsettingform_control}
                value={this.state.phone ? this.state.phone : phone}
                onChange={this.handlechange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label className="tm-hide-sm">&nbsp;</label>
              <button
                type="submit"
                className={classes.btn_primary}
                onClick={this.accountupdate}
              >
                Update Your Profile
              </button>
            </div>
            <div className="col-12">
              <button type="submit" className={classes.btn_primary}>
                Delete Your Account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AccountSettings;
