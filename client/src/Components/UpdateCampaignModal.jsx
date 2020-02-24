import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";

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

class UpdateCampaignModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      request: {
        data: {},
        error: false,
        loading: false
      }
    };
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      request: {
        data: {},
        error: false,
        loading: true
      }
    });
    axios
      .get(`http://localhost:4567/campaigns/${this.state.id}`)
      .then(response => {
        this.setState({
          ...this.state,
          request: {
            data: response.data[0],
            error: false,
            loading: false
          }
        });
      })
      .catch(error => {
        this.setState({
          ...this.state,
          request: {
            data: {},
            error: true,
            loading: false
          }
        });
      });
  };

  handleChange = field => {
    return e => {
      this.setState({
        ...this.state,
        request: {
          ...this.state.request,
          data: {
            ...this.state.request.data,
            [field]: e.target.value
          }
        }
      });
    };
  };

  handleSubmitClose = e => {
    const { icon, color, title } = this.state.request.data;
    axios
      .put(`http://localhost:4567/campaigns/${this.state.id}`, {
        icon,
        color,
        title
      })
      .then(response => {
        console.log(response);
        this.props.getCampaigns();
        this.props.handleToggleModalUpdateCampaign();
      })
      .catch(error => {
        console.log(error);
        this.props.handleToggleModalUpdateCampaign();
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <>
        <Dialog
          open
          onClose={() => this.props.handleToggleModalUpdateCampaign()}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update Campaign
              </Typography>
              {this.state.request.loading ? (
                <p>loading</p>
              ) : (
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
                    value={this.state.request.data.title}
                    onChange={this.handleChange("title")}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    name="color"
                    label="Color"
                    type="text"
                    id="color"
                    value={this.state.request.data.color}
                    autoComplete="current-password"
                    onChange={this.handleChange("color")}
                  />
                  <FormControl style={{ width: "100%", marginTop: "16px" }}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Icon
                    </InputLabel>
                    <Select
                      native
                      value={this.state.request.data.icon}
                      onChange={this.handleChange("icon")}
                      // labelWidth={labelWidth}
                      inputProps={{
                        name: "age",
                        id: "outlined-age-native-simple"
                      }}
                    >
                      <option value="" />
                      <option value="js">Js</option>
                      <option value="react">React</option>
                      <option value="angular">Angular</option>
                      <option value="java">Java</option>
                      <option value="aws">aws</option>
                      <option value="git">git</option>
                    </Select>
                  </FormControl>
                </form>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.props.handleToggleModalUpdateCampaign()}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={this.handleSubmitClose} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
export default withStyles(styles, {})(UpdateCampaignModal);
