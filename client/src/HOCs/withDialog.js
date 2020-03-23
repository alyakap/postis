import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#4DB6AC"
  },
  form: {
    marginTop: theme.spacing(1),
    width: "30rem"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});
const withDialog = (settingsObject = {}) => WrappedComponent => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {},
        error: ""
      };
    }
    passStateUp = passedState => {
      this.setState({
        data: passedState
      });
    };
    handleSubmit = e => {
      e.preventDefault();
      if (Object.entries(this.state).length === 0) {
        this.props.toggle();
        this.props.getItems();
      } else {
        settingsObject
          .submit(this.state.data)
          .then(resp => {
            this.props.toggle();
            this.props.getItems();
            switch (settingsObject.title) {
              case "Add new campaign":
                this.props.setSnackMessage(
                  "New campaign was added successfully"
                );
                this.props.setSeverity("success");
                break;
              case "Edit Campaign":
                this.props.setSnackMessage(
                  "The campaign was changed successfully"
                );
                this.props.setSeverity("success");
                break;
              case "Delete Campaign":
                this.props.setSnackMessage("The campaign was removed");
                this.props.setSeverity("info");
                break;
              case "Add new task":
                this.props.setSnackMessage("New task was added successfully");
                this.props.setSeverity("success");
                break;

              case "Edit Task":
                this.props.setSnackMessage("The task was changed successfully");
                this.props.setSeverity("success");
                break;
              case "Assign Task to User":
                this.props.setSnackMessage(
                  "The task was assigned successfully"
                );
                this.props.setSeverity("info");
                break;
              default:
            }
            this.props.setShowSnack(true);
          })
          .catch(error => {
            let errObj = JSON.parse(error.response.request.response);
            console.log("2", errObj.errors[0]);
            this.setState({
              error: errObj.errors[0]
            });
          });
      }
    };
    render() {
      const { classes } = this.props;
      return (
        <div>
          <Dialog
            open
            onClose={() => this.props.toggle()}
            aria-labelledby="form-dialog-title"
          >
            <form
              id="myForm"
              onSubmit={this.handleSubmit}
              className={classes.form}
              noValidate
            >
              <DialogContent>
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    {settingsObject.icon === "add" && <AddToPhotosIcon />}
                    {settingsObject.icon === "edit" && <EditIcon />}
                    {settingsObject.icon === "assign" && <AssignmentIndIcon />}
                    {settingsObject.icon === "delete" && <DeleteForeverIcon />}
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {settingsObject.title}
                  </Typography>
                  <WrappedComponent
                    passStateUp={this.passStateUp}
                    {...this.props}
                    error={this.state.error}
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.props.toggle()} color="primary">
                  Cancel
                </Button>
                <Button type="submit" form="myForm" color="primary">
                  Okay
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      );
    }
  }

  return withStyles(styles, {})(HOC);
};

export default withDialog;
