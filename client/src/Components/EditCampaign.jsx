import React from "react";
import IconPicker from "./IconPicker";
import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";
import FormHelperText from "@material-ui/core/FormHelperText";

class EditCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      iconPicker: false,
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
  handleOpenIconPicker = () => {
    this.setState({
      ...this.state,
      iconPicker: !this.state.iconPicker
    });
  };
  handleChangeIcon = icon => {
    this.setState(
      {
        iconPicker: !this.state.iconPicker,
        request: {
          ...this.state.request,
          data: {
            ...this.state.request.data,
            icon: icon
          }
        }
      },
      () => {
        this.props.passStateUp(this.state);
      }
    );
  };
  render() {
    return (
      <>
        <TextField
          error={this.props.error.param === "title"}
          helperText={
            this.props.error.param === "title" && this.props.error.msg
          }
          margin="normal"
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

        <FormControl
          style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
          error={this.props.error.param === "color"}
        >
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
          {this.props.error.param === "color" && (
            <FormHelperText>{this.props.error.msg}</FormHelperText>
          )}
          <IconPicker
            error={this.props.error}
            handleChangeIcon={this.handleChangeIcon}
            selectedIcon={this.state.request.data.icon}
            iconPickerModal={this.state.iconPicker}
            handleOpenIconPicker={this.handleOpenIconPicker}
          ></IconPicker>
        </FormControl>
      </>
    );
  }
}
export default withDialog({
  title: "Edit Campaign",
  icon: "edit",
  submit: EditCampaign.submit
})(EditCampaign);
