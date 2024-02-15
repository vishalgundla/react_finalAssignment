import React, { Component } from "react";
import classes from "./AddNewProduct.module.css";
import { Link } from "react-router-dom";
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
);
class AddnewProduct extends Component {
  fileInput = React.createRef();
  cloudIcon = React.createRef();
  state = {
    name: "",
    description: "",
    category: "",
    stock: "",
    unitSold: "",
    expireDate: "",
    accid: "",
    imgUrl: "",
    iconDisplay: true,
  };

  makeid = () => {
    let length = 8;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  handlechange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addProductFormValidation() {
    let flag = true;
    if (
      (this.state.name === "",
      this.state.description === "",
      this.state.category === "",
      this.state.stock === "",
      this.state.unitSold === "",
      this.state.expireDate === "")
    ) {
      flag = false;
    }
    return flag;
  }
  adminupdate = (e) => {
    e.preventDefault();
    let isValidate = this.addProductFormValidation();
    if (isValidate === false) {
      alert("Please fill in all the fields!");
      return false;
    }
    let acctlist =
      localStorage.getItem("accountdata") === null
        ? []
        : JSON.parse(localStorage.getItem("accountdata"));
    let acctllistdata = acctlist["productsPage"]["products"];
    let acctdata = {
      name: this.state.name,
      description: this.state.description,
      category: this.state.category,
      stock: this.state.stock,
      unitSold: this.state.unitSold,
      expireDate: this.state.expireDate,
      ProductId: this.makeid(),
    };
    acctllistdata.push(acctdata);
    acctlist["productsPage"]["products"] = acctllistdata;
    localStorage.setItem("accountdata", JSON.stringify(acctlist));
    this.setState({
      name: "",
      description: "",
      category: "",
      stock: "",
      unitSold: "",
      expireDate: "",
    });
    let path = `/product`;
    this.props.history.push(path);
  };

  fireInputOnClick = () => {
    this.fileInput.current.click();
    this.setState({ iconDisplay: false });
  };

  handleFileInput = (e) => {
    const fileSize = Math.round(e.target.files[0].size / 800);
    if (fileSize > 1) {
      alert("File size can't be more than 1 MB");
      this.setState({ iconDisplay: true });
      return;
    }
    const imgurl = URL.createObjectURL(e.target.files[0]);
    this.setState({ imgUrl: imgurl });
  };

  render() {
    return (
      <div className={["container"]}>
        <div className={["row"]}>
          <div
            className={[
              "col-xl-9",
              "col-lg-10",
              "col-md-12",
              "col-sm-12",
              "mx-auto",
            ].join(" ")}
          >
            <div className={classes.tm_bg_primary_dark}>
              <div className={["row"]}>
                <div className={["col-12"]}>
                  <h2 className={classes.tm_block_title}>Add Product</h2>
                </div>
              </div>
              <div className={["row"]}>
                <div
                  className={["col-xl-6", "col-lg-6", "col-md-12"].join(" ")}
                >
                  <form action="" className={classes.tm_edit_product_form}>
                    <div className={["form-group", "mb-3"].join(" ")}>
                      <label htmlFor="name">Product Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={["form-control"]}
                        onChange={this.handlechange}
                        required=""
                      />
                    </div>
                    <div className={["form-group", "mb-3"].join(" ")}>
                      <label htmlFor="description">Description</label>
                      <textarea
                        className={["form-control"]}
                        name="description"
                        rows="3"
                        required=""
                        onChange={this.handlechange}
                      ></textarea>
                    </div>
                    <div className={["form-group", "mb-3"].join(" ")}>
                      <label htmlFor="category">Category</label>
                      <select
                        className="custom-select tm-select-accounts"
                        name="category"
                        id="category"
                        onChange={this.handlechange}
                      >
                        <option defaultValue="">Select category</option>
                        <option value="New Arrival">New Arrival</option>
                        <option value="Most Popular">Most Popular</option>
                        <option value="Trending">Trending</option>
                      </select>
                    </div>
                    <div className="row">
                      <div
                        className={[
                          "form-group",
                          "mb-3",
                          "col-xs-12",
                          "col-sm-6",
                        ].join(" ")}
                      >
                        <label htmlFor="expire_date">Expire Date</label>
                        {
                          <input
                            id="expire_date"
                            name="expireDate"
                            type="date"
                            className={[
                              "form-control",
                              "validate",
                              "hasDatepicker",
                            ].join(" ")}
                            data-large-mode="true"
                            onChange={this.handlechange}
                          />
                        }
                      </div>
                      <div
                        className={[
                          "form-group",
                          "mb-3",
                          "col-xs-12",
                          "col-sm-6",
                        ].join(" ")}
                      >
                        <label htmlFor="stock">Units In Stock</label>
                        <input
                          id="stock"
                          name="stock"
                          type="number"
                          className={[
                            "form-control",
                            "validate",
                            "hasDatepicker",
                          ].join(" ")}
                          required=""
                          onChange={this.handlechange}
                        />
                      </div>
                      <div
                        className={[
                          "form-group",
                          "mb-3",
                          "col-xs-12",
                          "col-sm-6",
                        ].join(" ")}
                      >
                        <label htmlFor="stock">Unit Sold</label>
                        <input
                          id="stock"
                          name="unitSold"
                          type="number"
                          className={[
                            "form-control",
                            "validate",
                            "hasDatepicker",
                          ].join(" ")}
                          required=""
                          onChange={this.handlechange}
                        />
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className={["col-xl-6", "col-lg-6", "col-md-12"].join(" ")}
                >
                  <div className={classes.tm_product_img_dummy}>
                    <i
                      className={
                        this.state.iconDisplay
                          ? [
                              "fas",
                              "fa-cloud-upload-alt",
                              "tm-upload-icon",
                            ].join(" ")
                          : ["hideIcon"]
                      }
                    ></i>
                    <img src={this.state.imgUrl} className={["img-fluid"]} />
                  </div>
                  <div className={["custom-file", "mt-3", "mb-3"].join(" ")}>
                    <input
                      type="file"
                      hidden
                      ref={this.fileInput}
                      onChange={this.handleFileInput}
                    />
                    <button
                      type="button"
                      className={["button"]}
                      value="UPLOAD PRODUCT IMAGE"
                      onClick={this.fireInputOnClick}
                    >
                      UPLOAD PRODUCT IMAGE
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className={["button"]}
                    onClick={this.adminupdate}
                  >
                    Add Product Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddnewProduct;
