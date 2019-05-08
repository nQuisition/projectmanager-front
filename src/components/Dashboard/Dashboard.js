import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import * as styles from "./Dashboard.module.scss";
import * as Button from "../FormElements/Button";
import Spinner, {
  SIZES as SPINNER_SIZES,
  POSITIONING as SPINNER_POSITIONING
} from "../Spinner/Spinner";
import ProjectCardGrid from "../ProjectCard/ProjectCardGrid";
import ProjectBoardContainer from "../ProjectBoard/ProjectBoardContainer";

function Dashboard({
  active,
  user,
  logout,
  createProjectClicked,
  deleteProject,
  projects,
  isFetchingProjects,
  isSigningOut
}) {
  if (!active) {
    return null;
  }
  const logoutSpinner = isSigningOut ? (
    <Spinner
      spinnerSize={SPINNER_SIZES.TINY}
      positioning={SPINNER_POSITIONING.ABSOLUTE}
    />
  ) : null;
  return (
    <div>
      <h1>Dashboard</h1>
      <div>Logged in as {user.name}</div>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Button.Primary
        text="Log Out"
        innerComponent={logoutSpinner}
        disabled={isSigningOut}
        buttonSize={Button.SIZES.SMALL}
        onClick={logout}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={routeProps => (
            <ProjectCardGrid
              {...routeProps}
              projects={projects}
              isFetchingProjects={isFetchingProjects}
              createProjectClicked={createProjectClicked}
              deleteProjectClicked={deleteProject}
            />
          )}
        />
        <Route
          exact
          path="/project/:id"
          render={routeProps => (
            <ProjectBoardContainer
              routeProjectId={routeProps.match.params.id}
              project={projects.find(
                project => project.id === routeProps.match.params.id
              )}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default Dashboard;
