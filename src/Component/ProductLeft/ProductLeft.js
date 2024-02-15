import React, { Component } from "react";
import classes from "./ProductLeft.module.css";
import { Link } from "react-router-dom";
export class ProductLeft extends Component {
  state = {
    ProductList: [],
    isChecked: false,
  };
  componentDidUpdate(oldProps) {
    if (oldProps.ProductList !== this.props.ProductList) {
      this.setState({
        ProductList: this.props.ProductList,
      });
    }
  }
  getProductList = () => {
    let productDat = this.state.ProductList.map((item) => {
      return this.displayProducts(item);
    });

    return productDat;
  };

  uncheckAllProducts = (e) => {
    var checkboxes = new Array();
    checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].type == "checkbox") {
        checkboxes[i].checked = false;
      }
    }

    return true;
  };
  deletselectproduct = (e) => {
    var selectedProducts = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    console.log(checkboxes);
    for (let i = 0; i < checkboxes.length; i++) {
      selectedProducts.push(checkboxes[i].value);
    }

    if (selectedProducts.length > 0) {
      let filterdata = [];
      let ProductList = this.state.ProductList;

      ProductList.map((item) => {
        if (selectedProducts.indexOf(item.ProductId) === -1) {
          filterdata.push(item);
        }
      });
      let acctdata = JSON.parse(localStorage.getItem("accountdata"));
      acctdata["productsPage"]["products"] = filterdata;

      localStorage.setItem("accountdata", JSON.stringify(acctdata));

      this.setState({
        ProductList: filterdata,
        isChecked: !this.state.isChecked,
      });
      this.uncheckAllProducts();
      return true;
    }
  };
  productdelet = (productdata) => {
    let ProductList = this.state.ProductList;
    let filterdata = ProductList.filter(
      (item) => item.ProductId !== productdata
    );
    let acctdata = JSON.parse(localStorage.getItem("accountdata"));
    acctdata["productsPage"]["products"] = filterdata;
    localStorage.setItem("accountdata", JSON.stringify(acctdata));
    this.setState({
      ProductList: filterdata,
    });
  };
  displayProducts = (data) => {
    return (
      <tr className={classes.thead}>
        <th className={classes.thspc}>
          <input type="checkbox" value={data.ProductId} />{" "}
        </th>
        <td className={classes.tm_product_name}>{data.name}</td>
        <td>{data.unitSold}</td>
        <td>{data.stock}</td>
        <td>{data.expireDate}</td>
        <td>
          <a
            href="#"
            onClick={() => this.productdelet(data.ProductId)}
            className={classes.tm_product_delete_link}
          >
            <i
              className={[
                "far",
                "fa-trash-alt",
                classes.tm_product_delete_icon,
              ].join(" ")}
            ></i>
          </a>
        </td>
      </tr>
    );
  };
  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
        <div className="tm-bg-primary-dark tm-block tm-block-products">
          <div className="tm-product-table-container">
            <table className="table table-hover tm-table-small tm-product-table ">
              <thead>
                <tr>
                  <th scope="col">&nbsp;</th>
                  <th scope="col">PRODUCT NAME</th>
                  <th scope="col">UNIT SOLD</th>
                  <th scope="col">IN STOCK</th>
                  <th scope="col">EXPIRE DATE</th>
                  <th scope="col">&nbsp;</th>
                </tr>
              </thead>
              <tbody>{this.getProductList()}</tbody>
            </table>
          </div>

          <Link
            to="/product/addnew"
            className="btn btn-primary btn-block text-uppercase mb-3"
          >
            Add new product
          </Link>
          <button
            className="btn btn-primary btn-block text-uppercase"
            onClick={this.deletselectproduct}
          >
            Delete selected products
          </button>
        </div>
      </div>
    );
  }
}

export default ProductLeft;
