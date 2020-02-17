import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));
export default function Home() {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Hey, Optis Marketing Team!
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Keep Optis Branding consistent. With Postis, you can plan, create,
              assign campaigns and tasks, work and get things done together!
            </Typography>
          </Container>
        </div>
      </Container>
    </div>
  );
}
