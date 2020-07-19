import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddDialog(props: SimpleDialogProps) {
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
        Select an item to remove from the inventory
      </DialogTitle>
    </Dialog>
  );
}
