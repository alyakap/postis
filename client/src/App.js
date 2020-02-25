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
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/campaigns" component={Campaigns} />
          <Route exact path="/tasks" component={Tasks} />
          <Route path="/task/:id" component={Task} />
        </Switch>
      </Layout>
    </>
  );
}
