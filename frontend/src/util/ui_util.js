import React from "react";
import ProjectEdit from "../components/projects/project_edit_modal";
import { PROJECT_EDIT_MODAL } from "../constants/modals";

export const renderUI = ui => {
  if (ui.length === 0) { return null; }
  let modal = ui[ui.length - 1];
  switch(modal.name) {
    case PROJECT_EDIT_MODAL:
      return <ProjectEdit project={modal.props.project} />
    default:
      return null;
  }
}