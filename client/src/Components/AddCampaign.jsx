import React from "react";

import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
  static submit = data => axios.post("http://localhost:4567/campaigns", data);
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
            id="campaign"
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
            name="color"
            label="Color"
            type="text"
            id="color"
            val={this.state.color}
            onChange={this.handleChange("color")}
          />
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
