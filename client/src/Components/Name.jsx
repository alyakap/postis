import React, { Component } from "react";
import withDialog from "../HOCs/withDialog";

class Name extends Component {
  render() {
    return (
      <div>
        <p>Hello I am Hanim</p>
      </div>
    );
  }
}
export default withDialog({ title: "name", icon: "add" })(Name);
