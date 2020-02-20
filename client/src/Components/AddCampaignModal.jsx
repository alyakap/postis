import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";

import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles(theme => ({
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={props.addCampaignModal}
        onClose={() => props.closeModal()}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddToPhotosIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Campaign
            </Typography>

            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="campaign"
                label="Title"
                name="Title"
                type="text"
                autoComplete="Title"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="color"
                label="Color"
                type="text"
                id="color"
                autoComplete="current-password"
              />
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Icon
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"

                  //   onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="react">React</MenuItem>
                  <MenuItem value="angular">Angular</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="javascript">Javascript</MenuItem>
                </Select>
              </FormControl>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => props.closeModal()}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => props.closeModal()}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
