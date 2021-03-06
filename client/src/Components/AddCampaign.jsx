import React from "react";
import IconPicker from "./IconPicker";
import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";
import FormHelperText from "@material-ui/core/FormHelperText";

class AddCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        title: "",
        color: "",
        icon: ""
      },
      iconPicker: false
    };
  }
  static submit = data =>
    axios.post(`http://localhost:4567/campaigns`, data);

  handleChange = field => {
    return e => {
      const newState = { ...this.state.data };

      newState[field] = e.target.value;
      this.setState(
        {
          ...this.state,
          data: newState
        },
        () => {
          this.props.passStateUp(this.state.data);
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
        data: {
          ...this.state.data,
          icon: icon
        }
      },
      () => {
        this.props.passStateUp(this.state.data);
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
          style={{ backgroundColor: "white" }}
          id="campaign"
          label="Title"
          name="Title"
          type="text"
          autoComplete="Title"
          autoFocus
          value={this.state.data.title}
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
            value={this.state.data.color || "#F3FAF1"}
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
            selectedIcon={this.state.data.icon}
            iconPickerModal={this.state.iconPicker}
            handleOpenIconPicker={this.handleOpenIconPicker}
          ></IconPicker>
        </FormControl>
      </>
    );
  }
}
export default withDialog({
  title: "Add new campaign",
  icon: "add",
  submit: AddCampaign.submit
})(AddCampaign);
