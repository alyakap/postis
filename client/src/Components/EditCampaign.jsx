import React from "react";

import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";

class EditCampaign extends React.Component {
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
      `${process.env.REACT_APP_API_URL}/campaigns/${data.id}`,
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
      .get(`${process.env.REACT_APP_API_URL}/campaigns/${this.state.id}`)
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
            id="campaign"
            label="Title"
            name="Title"
            type="text"
            autoComplete="Title"
            autoFocus
            value={this.state.request.data.title || ""}
            onChange={this.handleChange("title")}
          />

          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Indicate priority with color
            </InputLabel>
            <Select
              native
              value={this.state.request.data.color || "#F3FAF1"}
              onChange={this.handleChange("color")}
            >
              <option value="" />
              <option value="#FFDDDD">Red-Urgent</option>
              <option value="#FFFFCF">Yellow-High</option>
              <option value="#EAEBFF">Purple-Medium</option>
              <option value="#D9FFDF">Green-Low</option>
              <option value="#D9FFFF">Blue-Very low</option>
            </Select>
          </FormControl>
          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">Icon</InputLabel>
            <Select
              native
              value={this.state.request.data.icon || ""}
              onChange={this.handleChange("icon")}
            >
              <option value="" />
              <option value="js">Js</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
              <option value="java">Java</option>
              <option value="aws">aws</option>
              <option value="git">git</option>
            </Select>
          </FormControl>
        </form>
      </>
    );
  }
}
export default withDialog({
  title: "Edit Campaign",
  icon: "edit",
  submit: EditCampaign.submit
})(EditCampaign);
