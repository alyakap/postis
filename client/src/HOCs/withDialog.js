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
      this.state = {};
    }
    passStateUp = passedState => {
      this.setState({
        ...passedState
      });
    };
    handleSubmit = e => {
      e.preventDefault();
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
      settingsObject.snackOpen();
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
              id="myform"
              onSubmit={this.handleSubmit}
              className={classes.form}
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
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => this.props.toggle()} color="primary">
                  Cancel
                </Button>
                <Button type="submit" form="myform" color="primary">
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
