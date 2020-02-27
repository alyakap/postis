import React from "react";

import TextField from "@material-ui/core/TextField";
import axios from "axios";
import withDialog from "../HOCs/withDialog";
import { InputLabel, FormControl, Select } from "@material-ui/core";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: {
        title: "",
        description: "",
        campaigns_id: ""
      },

      campaigns: {
        data: [],
        error: false,
        loading: false
      }
    };
  }
  static submit = data => axios.post("http://localhost:4567/tasks", data);

  componentDidMount = () => {
    axios
      .get(`http://localhost:4567/campaigns`)
      .then(response => {
        if (response.data) {
          this.setState({
            ...this.state,
            campaigns: {
              loading: false,
              error: false,
              data: [...response.data]
            }
          });
        } else {
          this.setState({
            ...this.state,
            campaigns: {
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
          campaigns: {
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
          request: {
            ...this.state.request,
            [field]: e.target.value
          }
        },
        () => {
          this.props.passStateUp(this.state.request);
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
            val={this.state.request.title}
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
            val={this.state.request.description}
            onChange={this.handleChange("description")}
          />
          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Belongs to Campaign
            </InputLabel>
            <Select
              native
              value={this.state.request.campaigns_id || ""}
              onChange={this.handleChange("campaigns_id")}
            >
              <option value="" />
              {this.state.campaigns.data.map(campaign => (
                <option value={campaign.id} key={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </Select>
          </FormControl>
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
