import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import dateFormat from "dateformat";

const styles = theme => ({
  palette: {
    primary: {
      main: "red" //your color
    }
  },
  avatar: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "#4DB6AC"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  disabled: {
    color: "black !important"
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
});

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      task: {
        data: {},
        loading: false,
        error: false
      }
    };
  }
  componentDidMount = () => {
    this.setState({
      ...this.state,
      task: {
        data: {},
        error: false,
        loading: true
      }
    });
    axios
      .get(`http://localhost:4567/tasks/${this.state.id}`)
      .then(response => {
        if (response.data) {
          this.setState({
            task: {
              loading: false,
              error: false,
              data: response.data[0]
            }
          });
        } else {
          this.setState({
            task: {
              error: false,
              loading: false,
              data: {}
            }
          });
        }
      })
      .catch(error => {
        this.setState({
          ...this.state,
          task: {
            ...this.state.tasks,
            error: true,
            loading: false
          }
        });
        throw error;
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ marginBottom: "30px", color: "#4DB6AC" }}
          >
            {this.state.task.data.title}
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "15px" }}>
                <TextField
                  id="outlined-textarea56"
                  variant="outlined"
                  label="Description"
                  className={classes.root}
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  fullWidth
                  multiline
                  rows="5"
                  disabled
                  value={this.state.task.data.description || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginBottom: "15px" }}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  id="outlined-textarea0"
                  variant="outlined"
                  label="Belongs to Campaign"
                  fullWidth
                  disabled
                  value={this.state.task.data.campaigntitle || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6} style={{ marginBottom: "15px" }}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  id="outlined-textarea2ss"
                  variant="outlined"
                  label="Created at"
                  fullWidth
                  disabled
                  value={
                    dateFormat(
                      this.state.task.data.created,
                      "d mmm yyyy/ dddd, h:MM:ss"
                    ) || " "
                  }
                />
              </Grid>

              <Grid item xs={12} sm={4} style={{ marginBottom: "15px" }}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  id="outlined-textarea2"
                  variant="outlined"
                  label="Created by"
                  fullWidth
                  disabled
                  value={this.state.task.data.created_firstname || " "}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  id="outlined-textarea3"
                  variant="outlined"
                  label="Updated by"
                  fullWidth
                  disabled
                  value={this.state.task.data.updated_firstname || " "}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  InputLabelProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  InputProps={{
                    classes: {
                      disabled: classes.disabled
                    }
                  }}
                  id="outlined-textarea4"
                  variant="outlined"
                  label="Assigned to"
                  fullWidth
                  disabled
                  value={this.state.task.data.assigned_firstname || " "}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginBottom: "25px" }}
                container
                alignItems="flex-start"
                justify="flex-end"
              >
                <FormControlLabel
                  disabled
                  label="Completed"
                  classes={{
                    disabled: classes.disabled
                  }}
                  control={
                    <Checkbox
                      classes={{
                        disabled: classes.disabled
                      }}
                      checked={this.state.task.data.complete || false}
                      value={this.state.task.data.complete || false}
                    />
                  }
                />
              </Grid>
            </Grid>
          </React.Fragment>
          <Link to={`/tasks`}>
            <Avatar className={classes.avatar}>
              <Button>
                <KeyboardReturnIcon fontSize="large" />
              </Button>
            </Avatar>
          </Link>
        </Paper>
      </main>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Task);
