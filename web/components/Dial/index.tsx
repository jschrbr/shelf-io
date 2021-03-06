import React, { Fragment } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import MenuIcon from "@material-ui/icons/Menu";

import AddDialog from "../AddDialog";
import EditDialog from "../EditDialog";

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
  { icon: <EditIcon />, name: "Edit", label: "Edit" },
  { icon: <AddIcon />, name: "Add" },
];

export default function SpeedDialTooltipOpen(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAdd, addOpen] = React.useState(false);
  const [openEdit, editOpen] = React.useState(false);

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

  const handleDial = (e: any, operation: any) => {
    console.log(operation);
    switch (operation) {
      case "Add": {
        return addOpen(true);
      }
      case "Edit": {
        return editOpen(true);
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
            FabProps={{ "aria-label": `${action.name}-button` }}
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
