import axios from "axios";
import { connect } from "react-redux";
import "./App.css";

import React, { Component } from "react";
import Topbar from "./Containers/Topbar/Topbar";
import { BrowserRouter, Route, Link, Redirect, Switch } from "react-router-dom";
import Login from "./Containers/Login/Login";
import Dashboard from "./Containers/DashBoard/Dashboard";
import Product from "./Containers/Products/Product";
import AddNewProduct from "./Component/ProductLeft/AddNewProduct/AddNewProduct";
import AccountPage from "./Containers/AccountPage/AccountList";
import Footer from "./Containers/Footer/Footer";

class App extends Component {
  state = {
    accountData: {},
  };

  componentDidMount() {
    axios
      .get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
      .then((response) => {
        let accountdata = response.data;
        let ProductList = accountdata["productsPage"]["products"];
        let modify = ProductList.map((item, index) => {
          return { ...item, ProductId: `PML000${index}`, isChecked: false };
        });
        accountdata["productsPage"]["products"] = modify;

        let CategoriesList = accountdata["productsPage"]["categories"];
        let Categoriesmodify = CategoriesList.map((item, index) => {
          return { item, ProductId: `PRD000${index}` };
        });
        console.log(CategoriesList);
        accountdata["productsPage"]["categories"] = Categoriesmodify;
        this.setState({
          data: accountdata,
        });
        localStorage.setItem("accountdata", JSON.stringify(this.state.data));
        //   this.setState({accountData:{...response.data}})
        //  localStorage.setItem("accountdata",JSON.stringify(response.data))
        //    console.log(this.state.accountData);
      })
      .catch((err) => {
        console.log("API call failed");
      });
  }
  render() {
    //  console.log( this.props.loggedInStatus);
    return (
      <div>
        <BrowserRouter>
          <Topbar />
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                this.props.onUserLoggedIn ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />

            <Route
              exact
              path="/login"
              render={(props) =>
                !this.props.onUserLoggedIn ? (
                  <Login {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/product/addnew" component={AddNewProduct} />
            <Route exact path="/Homeaccount" component={AccountPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
// to get the logged in status
const mapStateToProps = (globalState) => {
  return {
    onUserLoggedIn: globalState.loggedInStatus,
  };
};
export default connect(mapStateToProps)(App);
