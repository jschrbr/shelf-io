import React, { Fragment } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";

import AddDialog from "../AddDialog";
import EditDialog from "../EditDialog";
import DeleteDialog from "../DeleteDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "fixed",
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
);

const actions = [
  { icon: <CloseIcon />, name: "Delete" },
  { icon: <EditIcon />, name: "Edit" },
  { icon: <AddIcon />, name: "Add" },
];

export default function SpeedDialTooltipOpen(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAdd, addOpen] = React.useState(false);
  const [openEdit, editOpen] = React.useState(false);
  const [openDelete, deleteOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addClose = () => {
    addOpen(false);
  };
  const editClose = () => {
    editOpen(false);
  };
  const deleteClose = () => {
    deleteOpen(false);
  };

  const handleDial = (e: any, operation: any) => {
    console.log(operation);
    switch (operation) {
      case "Add": {
        return addOpen(true);
      }
      case "Edit": {
        return editOpen(true);
      }
      case "Delete": {
        return deleteOpen(true);
      }
      default: {
        break;
      }
    }
  };

  return (
    <Fragment>
      <AddDialog open={openAdd} onClose={addClose} />
      <EditDialog open={openEdit} onClose={editClose} />
      <DeleteDialog open={openDelete} onClose={deleteClose} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={(e) => {
              e.preventDefault();
              handleDial(e, action.name);
            }}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}
