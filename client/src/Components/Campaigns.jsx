import React from "react";
import axios from "axios";
import dateFormat from "dateformat";

import AddCampaign from "./AddCampaign";
import Tasks from "./Tasks";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import EditCampaign from "./EditCampaign";

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
    fontSize: theme.typography.pxToRem(25),
    flexBasis: "3%"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "80%",
    alignItems: "center",
    color: theme.palette.text.secondary
  },
  thirdHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: "10%"
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
const FlexExpansionPanelSummary = withStyles({
  content: {
    alignItems: "center"
  }
})(ExpansionPanelSummary);

class Campaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {
        loading: false,
        error: false,
        data: []
      },
      selectedId: "",
      addCampaignModal: false,
      updateCampaignModal: false
    };
  }

  componentDidMount() {
    this.setState({
      campaigns: {
        loading: true
      }
    });
    this.getCampaigns();
  }

  getCampaigns = () => {
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
          campaigns: {
            error: true,
            loading: false
          }
        });
        throw error;
      });
  };

  handleExpand = campaign => e => {
    const items = this.state.campaigns.data;
    const index = items.indexOf(campaign);
    let item = items[index];
    item.expanded = !campaign.expanded;
    this.setState({
      campaigns: {
        data: items
      }
    });
  };
  formatDateTime = camTime => {
    var date = new Date(camTime);
    return dateFormat(date, "mmm d, h:MM");
  };
  handleToggleModalAddCampaigns = () => {
    this.setState({
      ...this.state,
      addCampaignModal: !this.state.addCampaignModal
    });
  };
  handleToggleModalEditCampaign = id => {
    this.setState({
      ...this.state,
      selectedId: id,
      updateCampaignModal: !this.state.updateCampaignModal
    });
  };

  deleteCampaign = id => {
    const refresh = this.getCampaigns;
    axios
      .delete(`http://localhost:4567/campaigns/${id}`, { id })
      .then(function(response) {
        refresh();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    return this.state.campaigns.loading ? (
      <ColorLinearProgress className={classes.margin} />
    ) : (
      <>
        <Container maxWidth="lg" className={classes.container}>
          {this.state.addCampaignModal && (
            <AddCampaign
              toggle={this.handleToggleModalAddCampaigns}
              getItems={this.getCampaigns}
            />
          )}

          {this.state.updateCampaignModal && (
            <EditCampaign
              toggle={this.handleToggleModalEditCampaign}
              id={this.state.selectedId}
              getItems={this.getCampaigns}
            />
          )}
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
                  Campaigns
                </Typography>
                <Fab
                  className={classes.primary}
                  onClick={this.handleToggleModalAddCampaigns}
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>

              {this.state.campaigns.data.map(campaign => {
                return (
                  <ExpansionPanel
                    style={{ backgroundColor: `${campaign.color}` }}
                    key={campaign.id}
                    expanded={campaign.expanded}
                    onChange={this.handleExpand(campaign)}
                  >
                    <FlexExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        <FontAwesomeIcon icon={["fab", campaign.icon]} />
                      </Typography>
                      &nbsp;
                      <Typography className={classes.secondaryHeading}>
                        {campaign.title}
                      </Typography>
                      <Typography className={classes.thirdHeading}>
                        <FontAwesomeIcon icon={faCalendar} />
                        &nbsp;
                        {this.formatDateTime(campaign.created)}
                      </Typography>
                      <Typography>
                        <Button
                          onClick={e =>
                            this.handleToggleModalEditCampaign(campaign.id)
                          }
                        >
                          <EditIcon />
                        </Button>
                      </Typography>
                      <Typography>
                        <Button
                          onClick={() => this.deleteCampaign(campaign.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Typography>
                    </FlexExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {campaign.expanded && <Tasks campaignId={campaign.id} />}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                );
              })}
            </div>
          </div>
        </Container>
      </>
    );
  }
}
export default withStyles(styles, { withTheme: true })(Campaigns);
