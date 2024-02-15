import React, { Component } from "react";
import ProductLeft from "../../Component/ProductLeft/ProductLeft";
import "./Product.css";
import Category from "../../Component/Category/Category";
class Product extends Component {
  state = {
    ProductList: [],
    ProductCategories: [],
  };
  componentDidMount() {
    let Productindex = JSON.parse(localStorage.getItem("accountdata"));
    let ProductList = Productindex["productsPage"]["products"];
    let ProductCategories = Productindex["productsPage"]["categories"];
    this.setState({
      ProductList: ProductList,
      ProductCategories: ProductCategories,
    });
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="row tm-content-row">
          <ProductLeft ProductList={this.state.ProductList} />
          <Category ProductCategories={this.state.ProductCategories} />
        </div>
      </div>
    );
  }
}

export default Product;
