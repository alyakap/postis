import React from "react";

import { Typography } from "@material-ui/core";
import axios from "axios";
import withDialog from "../HOCs/withDialog";

class DeleteCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: props.title
    };
  }
  static submit = campaign => {
    return axios.delete(`http://localhost:4567/campaigns/${campaign.id}`);
  };
  componentDidMount = () => {
    console.log("component did mount works", this.state.id);
    this.props.passStateUp(this.state);
  };

  render() {
    return (
      <>
        <Typography
          style={{ marginTop: "15px" }}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Are you sure you want to delete :
        </Typography>
        <Typography
          style={{ marginTop: "15px", color: "#4db6ac" }}
          align="center"
          variant="h6"
          color="textPrimary"
          gutterBottom
        >
          '{this.state.title}'
        </Typography>
        <Typography
          style={{ marginTop: "15px" }}
          align="center"
          color="textPrimary"
          gutterBottom
        >
          with its tasks?
        </Typography>
      </>
    );
  }
}
export default withDialog({
  title: "Delete Campaign",
  icon: "delete",
  submit: DeleteCampaign.submit
})(DeleteCampaign);
