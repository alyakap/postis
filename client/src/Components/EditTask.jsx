import React from "react";

import { TextField } from "@material-ui/core";
import { InputLabel, FormControl, Select } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      error: false,
      loading: false,
      toBeSend: {
        id: "",
        title: "",
        description: "",
        campaigns_id: "",
        complete: false
      },
      campaigns: {
        data: [],
        error: false,
        loading: false
      }
    };
  }
  static submit = data => {
    return axios.put(`http://localhost:4567/tasks/${data.id}`, data);
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    axios
      .get(`http://localhost:4567/tasks/${this.state.id}`)
      .then(response => {
        this.setState({
          ...this.state,
          loading: false,
          toBeSend: {
            id: response.data[0].id,
            title: response.data[0].title,
            description: response.data[0].description,
            campaigns_id: response.data[0].campaigns_id,
            complete: response.data[0].complete
          }
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: true,
          loading: false
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
          toBeSend: {
            ...this.state.toBeSend,
            [field]: e.target.value
          }
        },
        () => {
          this.props.passStateUp(this.state.toBeSend);
        }
      );
    };
  };
  handleChangeCheckedBox = e => {
    this.setState(
      {
        ...this.state,
        toBeSend: {
          ...this.state.toBeSend,
          complete: !this.state.toBeSend.complete
        }
      },
      () => {
        this.props.passStateUp(this.state.toBeSend);
      }
    );
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
            value={this.state.toBeSend.title || ""}
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
            value={this.state.toBeSend.description || ""}
            onChange={this.handleChange("description")}
          />
          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Belongs to Campaign
            </InputLabel>
            <Select
              native
              value={this.state.toBeSend.campaigns_id || ""}
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
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.toBeSend.complete || false}
                onChange={this.handleChangeCheckedBox}
              />
            }
            label="Completed"
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
