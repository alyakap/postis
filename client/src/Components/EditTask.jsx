import React from "react";

import { TextField } from "@material-ui/core";
import { InputLabel, FormControl, Select } from "@material-ui/core";
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
      },
      campaigns: {
        data: [],
        error: false,
        loading: false
      }
    };
  }
  static submit = data => {
    console.log("data from submit", data.request.data);
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
    this.getCampaigns();
  };
  getCampaigns = () => {
    axios
      .get(`http://localhost:4567/campaigns`)
      .then(response => {
        if (response.data) {
          this.setState({
            campaigns: {
              loading: false,
              error: false,
              data: [...response.data]
            }
          });
        } else {
          this.setState({
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
            value={this.state.request.data.title || ""}
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
            value={this.state.request.data.description || ""}
            onChange={this.handleChange("description")}
          />
          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Belongs to Campaign
            </InputLabel>
            <Select
              native
              value={this.state.request.data.campaigns_id || ""}
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
  title: "Edit Task",
  icon: "edit",
  submit: EditTask.submit
})(EditTask);
