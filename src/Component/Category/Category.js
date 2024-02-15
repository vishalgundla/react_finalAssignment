import React, { Component } from "react";
import "./Category.css";

export class Category extends Component {
  state = {
    CategoryList: JSON.parse(localStorage.getItem("accountdata")).productsPage
      .categories,
  };

  deleteCategory = (pos) => {
    let restCategoryData = this.state.CategoryList.filter((item, index) => {
      return pos !== index;
    });

    let updateArr = JSON.parse(localStorage.getItem("accountdata"));

    updateArr.productsPage.categories = restCategoryData;
    localStorage.setItem("accountdata", JSON.stringify(updateArr));
    this.setState({ CategoryList: restCategoryData });
  };

  render() {
    const mapCategoryList = this.state.CategoryList.map((category, index) => {
      return (
        <tr key={index}>
          <td className="tm-product-name">{category.item}</td>
          <td className="text-center">
            <a href="#" className="tm-product-delete-link">
              <i
                onClick={() => {
                  this.deleteCategory(index);
                }}
                className="far fa-trash-alt tm-product-delete-icon"
              ></i>
            </a>
          </td>
        </tr>
      );
    });
    return (
      <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
        <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
          <h2 className="tm-block-title">Product Categories</h2>
          <div className="tm-product-table-container">
            <table className="table tm-table-small tm-product-table">
              <tbody>{mapCategoryList}</tbody>
            </table>
          </div>
          <button className="btn btn-primary btn-block text-uppercase mb-3">
            Add new category
          </button>
        </div>
      </div>
    );
  }
}

export default Category;
