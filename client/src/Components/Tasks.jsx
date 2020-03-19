import React, { Component } from "react";
import axios from "axios";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@material-ui/icons/Add";
import AddTask from "./AddTask";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import EditTask from "./EditTask";
import AssignTask from "./AssignTask";
import dateFormat from "dateformat";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Fab,
  LinearProgress
} from "@material-ui/core";
const styles = theme => ({
  table: {
    minWidth: 650
  },
  root: {
    width: "100%"
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4)
  },
  primary: {
    backgroundColor: "#4DB6AC"
  }
});
const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb"
  },
  barColorPrimary: {
    backgroundColor: "#00695c"
  }
})(LinearProgress);
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        loading: false,
        error: false,
        data: []
      },
      selectedId: "",
      selectedTitle: "",
      selectedAssignedUser: "",
      addTaskModal: false,
      editTaskModal: false,
      assignTaskModal: false
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      tasks: {
        ...this.state.tasks,
        loading: true
      }
    });
    this.getTasks();
  }
  getTasks = () => {
    const {
      props: { campaignId }
    } = this;
    const url = campaignId
      ? `${process.env.REACT_APP_API_URL}/tasks/fromcampaign/${campaignId}`
      : `${process.env.REACT_APP_API_URL}/tasks`;
    axios
      .get(url)
      .then(response => {
        if (response.data) {
          this.setState({
            tasks: {
              loading: false,
              error: false,
              data: [...response.data]
            }
          });
        } else {
          this.setState({
            tasks: {
              error: false,
              loading: false,
              data: []
            }
          });
        }
      })
      .catch(error => {
        this.setState({
          ...this.state,
          tasks: {
            ...this.state.tasks,
            error: true,
            loading: false
          }
        });
        throw error;
      });
  };
  formatDateTime = tasTime => {
    var date = new Date(tasTime);
    return dateFormat(date, "mmm d, h:MM");
  };
  handleToggleModalAddTask = () => {
    this.setState({
      ...this.state,
      addTaskModal: !this.state.addTaskModal
    });
  };
  handleToggleModalEditTask = id => {
    this.setState({
      ...this.state,
      selectedId: id,
      editTaskModal: !this.state.editTaskModal
    });
  };
  handleToggleModalAssignTask = (id, title, assigned_user) => {
    this.setState({
      ...this.state,
      selectedId: id,
      selectedTitle: title,
      selectedAssignedUser: assigned_user,
      assignTaskModal: !this.state.assignTaskModal
    });
  };

  deleteTask = id => {
    const refresh = this.getTasks;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { id })
      .then(function(response) {
        refresh();
      })
      .catch(function(error) {
        throw error;
      });
  };
  render() {
    const { classes } = this.props;
    return this.state.tasks.loading ? (
      <ColorLinearProgress className={classes.margin} />
    ) : (
      <Container maxWidth="lg" className={classes.container}>
        {this.state.addTaskModal && (
          <AddTask
            toggle={this.handleToggleModalAddTask}
            getItems={this.getTasks}
            setShowSnack={this.props.setShowSnack}
            setSnackMessage={this.props.setSnackMessage}
            setSeverity={this.props.setSeverity}
          />
        )}
        {this.state.editTaskModal && (
          <EditTask
            toggle={this.handleToggleModalEditTask}
            getItems={this.getTasks}
            id={this.state.selectedId}
            setShowSnack={this.props.setShowSnack}
            setSnackMessage={this.props.setSnackMessage}
            setSeverity={this.props.setSeverity}
          />
        )}
        {this.state.assignTaskModal && (
          <AssignTask
            toggle={this.handleToggleModalAssignTask}
            getItems={this.getTasks}
            id={this.state.selectedId}
            title={this.state.selectedTitle}
            assigned_user={this.state.selectedAssignedUser}
            setShowSnack={this.props.setShowSnack}
            setSnackMessage={this.props.setSnackMessage}
            setSeverity={this.props.setSeverity}
          />
        )}

        <div className={classes.heroContent}>
          <div className={classes.root}>
            {!this.props.campaignId && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "60px"
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  Tasks
                </Typography>
                <Fab
                  className={classes.primary}
                  onClick={this.handleToggleModalAddTask}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>
            )}
            {this.state.tasks.data.length >= 1 && (
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "35%" }} />
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                    <col style={{ width: "15%" }} />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <TableCell>Details</TableCell>
                      <TableCell align="left">Title</TableCell>
                      <TableCell align="right">Campaign</TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">Assigned User</TableCell>
                      <TableCell align="right">
                        <FontAwesomeIcon icon={faCalendar} />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.tasks.data.map(task => (
                      <TableRow key={task.id}>
                        <TableCell component="th" scope="row">
                          <Link to={`/task/${task.id}`}>
                            <Button>
                              <VisibilityIcon />
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell align="left">{task.title}</TableCell>
                        <TableCell align="right">
                          {task.campaigntitle}
                        </TableCell>
                        <TableCell align="right">
                          {this.formatDateTime(task.created)}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={e =>
                              this.handleToggleModalAssignTask(
                                task.id,
                                task.title,
                                task.assigned_user
                              )
                            }
                          >
                            <Chip
                              onClick={e =>
                                this.handleToggleModalAssignTask(
                                  task.id,
                                  task.title,
                                  task.assigned_user
                                )
                              }
                              style={{ backgroundColor: "#4DB6AC" }}
                              size="medium"
                              icon={<AssignmentIndIcon />}
                              label={task.firstname}
                              clickable
                              color="primary"
                            />
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={e =>
                              this.handleToggleModalEditTask(task.id)
                            }
                          >
                            <EditIcon />
                          </Button>
                          <Button
                            onClick={() => {
                              this.deleteTask(task.id);
                              this.props.setShowSnack(true);
                              this.props.setSnackMessage(
                                "The task was removed"
                              );
                              this.props.setSeverity("info");
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Tasks);
