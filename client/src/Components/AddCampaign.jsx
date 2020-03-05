import React from "react";

import { TextField, InputLabel, FormControl, Select } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";

class AddCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      color: "",
      icon: ""
    };
  }
  static submit = data =>
    axios.post(`${process.env.REACT_APP_API_URL}/campaigns`, data);
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
            style={{ backgroundColor: "white" }}
            id="campaign"
            label="Title"
            name="Title"
            type="text"
            autoComplete="Title"
            autoFocus
            val={this.state.title}
            onChange={this.handleChange("title")}
          />

          <FormControl style={{ width: "100%", marginTop: "16px" }}>
            <InputLabel htmlFor="outlined-age-native-simple">
              Indicate priority with color
            </InputLabel>
            <Select
              native
              val={this.state.color || "#F3FAF1"}
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
              value={this.state.icon}
              onChange={this.handleChange("icon")}
              // labelWidth={labelWidth}
              inputProps={{
                name: "age",
                id: "outlined-age-native-simple"
              }}
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
  title: "Add new campaign",
  icon: "add",
  submit: AddCampaign.submit
})(AddCampaign);
