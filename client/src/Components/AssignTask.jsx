import React from "react";

import axios from "axios";
import withDialog from "../HOCs/withDialog";
import { Typography, Select } from "@material-ui/core";

class AssignTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {
        data: [],
        error: false,
        loading: false
      },
      taskId: props.id,
      assignedUser: props.assigned_user
    };
  }
  static submit = data => {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/tasks/${data.taskId}/assign`,
      {
        id: parseInt(data.assigned_user)
      }
    );
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      users: {
        ...this.state.users,
        loading: true
      }
    });
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => {
        if (response.data) {
          this.setState({
            ...this.state,
            users: {
              loading: false,
              error: false,
              data: response.data
            }
          });
        } else {
          this.setState({
            ...this.state,
            users: {
              error: false,
              loading: false,
              data: []
            }
          });
        }
      })
      .catch(error => {
        this.setState({
          ...this.state,
          users: {
            ...this.state.users,
            error: true,
            loading: false
          }
        });
        throw error;
      });
  };
  handleChange = field => {
    return e => {
      this.setState(
        {
          ...this.state,
          assignedUser: e.target.value
        },
        () => {
          this.props.passStateUp({
            taskId: this.state.taskId,
            assigned_user: this.state.assignedUser
          });
        }
      );
    };
  };

  render() {
    return (
      <>
        <Typography
          style={{ marginTop: "15px", color: "#4db6ac" }}
          align="center"
          variant="h6"
          color="textPrimary"
          gutterBottom
        >
          '{this.props.title}'
        </Typography>
        <Typography
          style={{ marginTop: "15px" }}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          assign to:
        </Typography>
        <form noValidate>
          {this.state.users.loading ? (
            <p>loading</p>
          ) : (
            <Select
              native
              value={this.state.assignedUser ? this.state.assignedUser : ""}
              onChange={this.handleChange("id")}
            >
              <option value="">Select an user</option>
              {this.state.users.data.map(user => (
                <option value={user.id} key={user.firstname}>
                  {user.firstname}
                </option>
              ))}
            </Select>
          )}
        </form>
      </>
    );
  }
}
export default withDialog({
  title: "Assign Task to User",
  icon: "assign",
  submit: AssignTask.submit
})(AssignTask);
