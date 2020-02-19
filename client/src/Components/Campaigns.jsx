import React from "react";
import axios from "axios";
//import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinearProgress from "@material-ui/core/LinearProgress";

const styles = theme => ({
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "2%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "90%",
    color: theme.palette.text.secondary
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
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

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {
        loading: false,
        error: false,
        data: []
      }
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      campaigns: {
        ...this.state.campaigns,
        loading: true
      }
    });
    axios
      .get(`http://localhost:4567/campaigns`)
      .then(response => {
        if (response.data) {
          const newData = response.data.map(campaign => {
            return { ...campaign, expanded: false };
          });
          this.setState({
            campaigns: {
              loading: false,
              error: false,
              data: [...newData]
            }
          });
        } else {
          this.setState({
            campaigns: {
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
          campaigns: {
            ...this.state.campaigns,
            error: true,
            loading: false
          }
        });
        throw error;
      });
  }

  handleExpand = campaign => e => {
    const items = this.state.campaigns.data;
    const index = items.indexOf(campaign);
    let item = items[index];
    item.expanded = !campaign.expanded;
    this.setState({
      ...this.state,
      campaigns: {
        ...this.state.campaigns,
        data: items
      }
    });
  };
  formatDateTime = camTime => {
    var date = new Date(camTime);
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
    return this.state.campaigns.loading ? (
      <ColorLinearProgress className={classes.margin} />
    ) : (
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
              Campaigns
            </Typography>
            {this.state.campaigns.data.map(campaign => {
              return (
                <ExpansionPanel
                  key={campaign.id}
                  expanded={campaign.expanded}
                  onChange={this.handleExpand(campaign)}
                >
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>
                      <FontAwesomeIcon icon={["fab", campaign.icon]} />
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      {campaign.title}
                    </Typography>
                    <Typography className={classes.thirdHeading}>
                      <FontAwesomeIcon icon={faCalendar} />
                      {"  "}
                      {this.formatDateTime(campaign.created)}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam
                      mattis feugiat. Aliquam eget maximus est, id dignissim
                      quam.
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Campaigns);
