import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function EditDialog(props: SimpleDialogProps) {
  let { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Edit an item in the inventory
      </DialogTitle>
      {/* 
      {getParts.map((part) => (
        <Typography component="h2" variant="h5">
          {part.name}
        </Typography>
      ))} */}
    </Dialog>
  );
}

export default EditDialog;
