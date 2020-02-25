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
    // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});
const withDialog = (settingsObject = {}) => WrappedComponent => {
  class HOC extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    passStateUp = passedState => {
      this.setState({
        ...passedState
      });
    };
    render() {
      const { classes } = this.props;
      return (
        <div>
          <Dialog
            open
            onClose={() => this.props.handleToggleModal()}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  {settingsObject.icon === "add" && <AddToPhotosIcon />}
                  {settingsObject.icon === "edit" && <EditIcon />}
                  {settingsObject.icon === "assign" && <AssignmentIndIcon />}
                </Avatar>
                <Typography component="h1" variant="h5">
                  {settingsObject.title}
                </Typography>
                <WrappedComponent
                  passStateUp={this.passStateUp}
                  {...this.props}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.props.toggle()} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  settingsObject
                    .submit(this.state)
                    .then(resp => {
                      this.props.toggle();
                      this.props.getItems();
                    })
                    .catch(err => {
                      console.log(err);
                      this.props.toggle();
                    });
                }}
                color="primary"
              >
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }

  return withStyles(styles, {})(HOC);
};

export default withDialog;
