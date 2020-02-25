import React from "react";

import TextField from "@material-ui/core/TextField";
import axios from "axios";
import withDialog from "../HOCs/withDialog";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  static submit = data => axios.post("http://localhost:4567/tasks", data);
  handleChange = field => {
    return e => {
      const newState = { ...this.state };
      newState[field] = e.target.value;
      this.setState(newState, () => {
        this.props.passStateUp(this.state);
      });
    };
  };
  render() {
    return (
      <>
        <form noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="tasks"
            label="Title"
            name="Title"
            type="text"
            autoComplete="Title"
            autoFocus
            val={this.state.title}
            onChange={this.handleChange("title")}
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            type="text"
            multiline
            rows="4"
            id="description"
            val={this.state.description}
            onChange={this.handleChange("description")}
          />
        </form>
      </>
    );
  }
}
export default withDialog({
  title: "Add new task",
  icon: "add",
  submit: AddTask.submit
})(AddTask);
