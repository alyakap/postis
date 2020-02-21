import React, { Component } from "react";
import axios from "axios";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddIcon from "@material-ui/icons/Add";
import AddTaskModal from "./AddTaskModal";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

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
  heroContent: {
    //backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
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
      addTaskModal: false
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
    axios
      .get(`http://localhost:4567/tasks`)
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
    return (
      date.getHours() +
      ":" +
      date.getUTCHours() +
      "   " +
      date.getDate() +
      "/" +
      (date.getMonth() + 1)
    );
  };
  handleClickOpenModal = () => {
    this.setState({
      ...this.state,
      addTaskModal: true
    });
  };
  handleCloseModal = () => {
    this.setState({
      ...this.state,
      addTaskModal: false
    });
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
        <AddTaskModal
          addTaskModal={this.state.addTaskModal}
          closeModal={this.handleCloseModal}
          getTasks={this.getTasks}
        />
        <div className={classes.heroContent}>
          <div className={classes.root}>
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
                onClick={this.handleClickOpenModal}
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </div>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Remove</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="right">Created by</TableCell>
                    <TableCell align="right">
                      <FontAwesomeIcon icon={faCalendar} />
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.tasks.data.map(task => (
                    <TableRow key={task.id}>
                      <TableCell component="th" scope="row">
                        <Button onClick={() => this.deleteTask(task.id)}>
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="left">{task.title}</TableCell>
                      <TableCell align="right">{task.created_user}</TableCell>
                      <TableCell align="right">
                        {this.formatDateTime(task.created)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Tasks);
