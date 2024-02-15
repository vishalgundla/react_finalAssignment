import React, { Component } from "react";
import classes from "./Login.module.css";
import { connect } from "react-redux";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Login extends Component {
  state = {
    username: "",
    password: "",
    formError: {
      username: "",
      password: "",
    },
  };

  filterAccountData = (e) => {
    let acctlist =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let userData = Object.values(acctlist["accountsPage"]);
    console.log(userData);
    let data = userData.filter((data) => data.email === this.state.username);

    if (data.length > 0) {
      if (
        data[0]["email"] === this.state.username &&
        data[0]["password"] === this.state.password
      ) {
        acctlist["isLogged"] = true;
        localStorage.setItem("accountdata", JSON.stringify(acctlist));
        return true;
      }
    }

    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let isLoggedIn = this.filterAccountData(e);

    if (isLoggedIn) {
      this.props.onUserLoggedIn();
      this.props.history.push("/dashboard");
    }
    console.log(isLoggedIn);
  };
  handlechange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let formError = this.state.formError;
    switch (name) {
      case "username":
        formError.password =
          value.length < 6 && value.length > 0
            ? "*minimum 6 characters required"
            : "";
        break;
      case "password":
        formError.username =
          emailRegex.test(value) && value.length > 0 ? "" : "*invalid password";
        break;
    }

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { formError } = this.state;
    return (
      <div className={["container", classes.spc].join(" ")}>
        <div className={["row"]}>
          <div
            className={["col-12", "mx-auto", classes.tm_login_col].join(" ")}
          >
            <div className={classes.tm_bg_primary_dark}>
              <div className={["row"]}>
                <div className={["col-12", "text-center"]}>
                  <h2 className={classes.tm_block_title}>
                    Welcome to Dashboard, Login
                  </h2>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <form action="index.html">
                    <div className={["form-group"]}>
                      <label htmlFor="username">Username</label>
                      <input
                        name="username"
                        type="text"
                        className={["form-control"]}
                        id="username"
                        value={this.state.username}
                        onChange={this.handlechange}
                        required=""
                      />
                    </div>
                    {formError.username.length > 0 && (
                      <span className={classes.Errormessage}>
                        {formError.username}
                      </span>
                    )}
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        type="password"
                        className={["form-control"]}
                        id="password"
                        value={this.state.password}
                        onChange={this.handlechange}
                        required=""
                      />
                    </div>
                    {formError.password.length > 0 && (
                      <span className={classes.Errormessage}>
                        {formError.password}
                      </span>
                    )}
                    <div className="form-group mt-4">
                      <button
                        type="submit"
                        onClick={this.handleSubmit}
                        className={["button"]}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// redux
const mapDispatchToProps = (dispatch) => {
  return {
    onUserLoggedIn: () => {
      dispatch({ type: "USER_LOGIN" });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);

// export default Login;
