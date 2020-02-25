import React from "react";

import { TextField } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      request: {
        data: {},
        error: false,
        loading: false
      }
    };
  }
  static submit = data => {
    return axios.put(
      `http://localhost:4567/tasks/${data.id}`,
      data.request.data
    );
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      request: {
        data: {},
        error: false,
        loading: true
      }
    });
    axios
      .get(`http://localhost:4567/tasks/${this.state.id}`)
      .then(response => {
        this.setState({
          ...this.state,

          request: {
            data: response.data[0],
            error: false,
            loading: false
          }
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          request: {
            data: {},
            error: true,
            loading: false
          }
        });
      });
  };
  handleChange = field => {
    return e => {
      this.setState(
        {
          ...this.state,
          request: {
            ...this.state.request,
            data: {
              ...this.state.request.data,
              [field]: e.target.value
            }
          }
        },
        () => {
          this.props.passStateUp(this.state);
        }
      );
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
            val={this.state.request.data.title}
            onChange={this.handleChange("title")}
          />
          <TextField
            margin="normal"
            fullWidth
            name="description"
            label="Description"
            type="text"
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
  title: "Edit Task",
  icon: "edit",
  submit: EditTask.submit
})(EditTask);
