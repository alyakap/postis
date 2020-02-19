import React, { Component } from "react";
import axios from "axios";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  Typography
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
  }
});
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: {
        loading: false,
        error: false,
        data: []
      }
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
  }
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
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.heroContent}>
          <div className={classes.root}>
            <Typography
              component="h1"
              variant="h2"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Tasks
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Task Id</TableCell>
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
                        {task.id}
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
