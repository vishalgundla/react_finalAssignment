import React, { Component } from "react";
import classes from "./Topbar.module.css";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
class Topbar extends Component {
  state = {
    showNave: false,
  };
  handleNav = () => {
    this.setState({ showNave: !this.state.showNave });
  };
  render() {
    return (
      <div>
        <nav
          className={["navbar-expand-xl", "navbar", classes.navbar].join(" ")}
        >
          <div className="container h-100">
            <Link
              to="/"
              className={["navbar-brand", classes.navbar_brand].join(" ")}
              href="index.html"
            >
              <h1 className={classes.tm_site_title}>Product Admin</h1>
            </Link>
            <button
              className={["navbar-toggler", classes.navbar_toggler].join(" ")}
              type="button"
              onClick={this.handelClick}
            >
              <i
                className={["fas", "fa-bars", classes.tm_nav_icon].join(" ")}
                onClick={this.handleNav}
              ></i>
            </button>
            <div
              className={
                !this.state.showNave
                  ? [
                      "navbar-collapse",
                      classes.navbar_collapse,
                      classes.Hidenav,
                    ].join(" ")
                  : ["navbar-collapse", classes.navbar_collapse].join(" ")
              }
              id="navbarSupportedContent"
            >
              <ul className={["navbar-nav", "mx-auto", "h-100"].join(" ")}>
                <li className={["nav-item"]}>
                  <NavLink
                    to="/Dashboard"
                    className={["nav-link", classes.nav_link].join(" ")}
                    href="index.html"
                  >
                    <i
                      className={[
                        "fas",
                        "fa-tachometer-alt",
                        classes.faicon,
                      ].join(" ")}
                    ></i>{" "}
                    Dashboard
                  </NavLink>
                </li>
                <li className={["nav-item"]}>
                  <NavLink
                    to="/product"
                    className={["nav-link", classes.nav_link].join(" ")}
                    href="products.html"
                  >
                    <i
                      className={[
                        "fas",
                        "fa-shopping-cart",
                        classes.faicon,
                      ].join(" ")}
                    ></i>{" "}
                    Products
                  </NavLink>
                </li>

                <li className={["nav-item"]}>
                  <NavLink
                    to="/Homeaccount"
                    className={["nav-link", classes.nav_link].join(" ")}
                    href="accounts.html"
                  >
                    <i
                      className={["far", "fa-user", classes.faicon].join(" ")}
                    ></i>{" "}
                    Accounts
                  </NavLink>
                </li>
              </ul>
              {this.props.userLoggedInStatus ? (
                <NavLink
                  onClick={this.props.onUserLoggedOut}
                  className="logout"
                  to="/"
                >
                  <div className={classes.nav_link}>
                    <span>Logout</span>
                  </div>
                </NavLink>
              ) : null}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapGlobalStateToProps = (globalState) => {
  return {
    userLoggedInStatus: globalState.loggedInStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserLoggedOut: () => {
      dispatch({ type: "USER_LOGOUT" });
    },
  };
};

export default connect(mapGlobalStateToProps, mapDispatchToProps)(Topbar);
