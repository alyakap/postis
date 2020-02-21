import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";

import DoneAllIcon from "@material-ui/icons/DoneAll";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
import axios from "axios";

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

class AddTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }
  handleChange = field => {
    return e => {
      const newState = { ...this.state };
      newState[field] = e.target.value;
      this.setState(newState);
    };
  };

  handleSubmitClose = () => {
    const props = this.props;
    axios
      .post("http://localhost:4567/tasks", this.state)
      .then(function(response) {
        props.getTasks();
        props.closeModal();
      })
      .catch(function(error) {
        console.log(error);
        props.closeModal();
      });
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Dialog
          open={this.props.addTaskModal}
          onClose={() => this.props.closeModal()}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <DoneAllIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add Task
              </Typography>
              <form className={classes.form} noValidate>
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
                  val={this.state.titleStr}
                  onChange={this.handleChange("title")}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  multiline
                  rows="4"
                  name="description"
                  label="Description"
                  type="text"
                  id="description"
                  autoComplete="current-password"
                  onChange={this.handleChange("description")}
                />
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.closeModal()} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmitClose} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default withStyles(styles, {})(AddTaskModal);
