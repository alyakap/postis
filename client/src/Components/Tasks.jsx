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
  // heroContent: {
  //   //backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(8, 0, 6)
  // },

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
      ? `http://localhost:4567/tasks/fromcampaign/${campaignId}`
      : `http://localhost:4567/tasks`;
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
  handleSeeDetails = id => {
    console.log(id);
  };

  deleteTask = id => {
    const refresh = this.getTasks;
    axios
      .delete(`http://localhost:4567/tasks/${id}`, { id })
      .then(function(response) {
        console.log(response.data);
        refresh();
      })
      .catch(function(error) {
        console.log(error);
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
          />
        )}
        {this.state.editTaskModal && (
          <EditTask
            toggle={this.handleToggleModalEditTask}
            getItems={this.getTasks}
            id={this.state.selectedId}
          />
        )}
        {this.state.assignTaskModal && (
          <AssignTask
            toggle={this.handleToggleModalAssignTask}
            getItems={this.getTasks}
            id={this.state.selectedId}
            title={this.state.selectedTitle}
            assigned_user={this.state.selectedAssignedUser}
          />
        )}

        <div className={classes.heroContent}>
          <div className={classes.root}>
            {!this.props.campaignId && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
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
                          <Button
                            onClick={e =>
                              this.handleToggleModalEditTask(task.id)
                            }
                          >
                            <EditIcon />
                          </Button>
                          <Button onClick={() => this.deleteTask(task.id)}>
                            <DeleteIcon />
                          </Button>
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
                            <AssignmentIndIcon />
                            &nbsp;
                            {task.firstname}
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          {this.formatDateTime(task.created)}
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
