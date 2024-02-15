import React, { Component } from "react";
import classes from "./ChangeAvatar.module.css";
import profile from "../../Assests/images/avatar.png";
class ChangeAvatar extends Component {
  state = {
    profileImg: profile,
    id: "someUniqueId", // I would use this.props.id for a real world implementation
    imageURI: null,
    Accountvalue: "",
    // uploadButton:true,
    // AccountValue:this.props.Accountvalue
  };

  componentDidUpdate(oldProps) {
    if (oldProps.ChangeAvatar !== this.props.ChangeAvatar) {
      const { profilePic } = this.props.ChangeAvatar;
      this.setState({
        profileImg:
          typeof profilePic !== "undefined" && profilePic !== ""
            ? profilePic
            : profile,
        Accountvalue: this.props.Accountvalue,
      });
    }
  }

  shouldComponentUpdate() {
    if (typeof this.props.ChangeAvatar === "undefined") {
      return false;
    } else {
      return true;
    }
  }
  deletimg = () => {
    let AccountValue = this.props.AccountValue;
    console.log(AccountValue);
    if (AccountValue) {
      let acctlist =
        localStorage.getItem("accountdata") === null
          ? []
          : JSON.parse(localStorage.getItem("accountdata"));
      //const filteritem = this.state.items.filter(item => item.key !== key);
      acctlist["accountsPage"][AccountValue]["profilePic"] = ""; // Image deleted
      localStorage.setItem("accountdata", JSON.stringify(acctlist));
    }

    this.setState({
      profileImg: profile,
    });
  };

  readURI(e) {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      let filename = e.target.files[0].name;
      let regx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename);

      if (regx === false) {
        alert("Invalid file type");
        return false;
      }
      let reader = new FileReader();
      reader.onload = function (e) {
        let acctlist =
          localStorage.getItem("accountdata") === null
            ? []
            : JSON.parse(localStorage.getItem("accountdata"));
        acctlist["accountsPage"][this.props.Accountvalue]["profilePic"] =
          e.target.result;
        localStorage.setItem("accountdata", JSON.stringify(acctlist));

        this.setState({
          imageURI: e.target.result,
          profileImg: e.target.result,
        });
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleChange(e) {
    this.readURI(e); // maybe call this with webworker or async library?
    if (this.props.onChange !== undefined) this.props.onChange(e); // propagate to parent component
  }
  render() {
    return (
      <div className={["tm-avatar-container", classes.tm_col_avatar].join(" ")}>
        <div className={classes.tm_bg_primary_dark}>
          <h2 className={classes.tm_block_title}>Change Avatar</h2>
          <div className={classes.tm_avatar_container}>
            <img
              src={this.state.profileImg}
              alt="Avatar"
              className={["img-fluid", "mb-4", classes.tm_avatar].join(" ")}
            />
            <a
              href="#"
              className={[
                "tm-avatar-delete-link",
                classes.tm_avatar_delete_link,
              ].join(" ")}
              onClick={this.deletimg}
            >
              <i className="far fa-trash-alt tm-product-delete-icon"></i>
            </a>
          </div>

          {this.state.Accountvalue === "" ? null : (
            <label htmlFor={this.state.id} className="button">
              Upload an image
            </label>
          )}
          <input
            id={this.state.id}
            type="file"
            onChange={this.handleChange.bind(this)}
            className="show-for-sr"
          />
        </div>
      </div>
    );
  }
}

export default ChangeAvatar;
