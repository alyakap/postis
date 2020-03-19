import React from "react";
import Layout from "./Components/Layout";
import Home from "./Components/Home";
import { Switch, Route } from "react-router-dom";
import Campaigns from "./Components/Campaigns";
import Tasks from "./Components/Tasks";
import Task from "./Components/Task";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab);

export default function App() {
  const [showSnack, setShowSnack] = React.useState(false);
  const [snackMessage, setSnackMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");
  return (
    <>
      <Layout
        snackMessage={snackMessage}
        showSnack={showSnack}
        setShowSnack={setShowSnack}
        severity={severity}
        setSeverity={setSeverity}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/campaigns"
            render={() => (
              <Campaigns
                setShowSnack={setShowSnack}
                setSnackMessage={setSnackMessage}
                setSeverity={setSeverity}
              />
            )}
          />
          <Route
            exact
            path="/tasks"
            render={() => (
              <Tasks
                setShowSnack={setShowSnack}
                setSnackMessage={setSnackMessage}
                setSeverity={setSeverity}
              />
            )}
          />
          <Route path="/task/:id" component={Task} />
        </Switch>
      </Layout>
    </>
  );
}
