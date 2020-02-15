import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PublicIcon from "@material-ui/icons/Public";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
const useStyles = makeStyles(theme => ({
  text: {
    color: "#fafafa"
    //backgroundColor: "#4db6ac"
  }
}));

export default function ListItems() {
  const classes = useStyles();
  return (
    <div>
      <ListItem
        className={classes.text}
        button
        onClick={e => {
          console.log("home");
        }}
      >
        <ListItemIcon>
          <HomeIcon className={classes.text} />
        </ListItemIcon>
        <ListItemText primary="Home" className={classes.text} />
      </ListItem>
      <ListItem button className={classes.text}>
        <ListItemIcon>
          <PublicIcon className={classes.text} />
        </ListItemIcon>
        <ListItemText primary="Campaigns" />
      </ListItem>
      <ListItem button className={classes.text}>
        <ListItemIcon>
          <FormatListBulletedIcon className={classes.text} />
        </ListItemIcon>
        <ListItemText primary="Tasks" />
      </ListItem>
    </div>
  );
}
