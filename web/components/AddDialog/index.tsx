import React, { useState } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { dialogStyles } from "../../helpers/theme";

import * as FirestoreService from "../../middleware/admin";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function AddDialog(props: SimpleDialogProps) {
  const classes = dialogStyles();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  let { open, onClose } = props;

  const handleClose = () => {
    setLoading(false);
    setName("");
    setQuantity(0);
    onClose();
  };
  const handleSubmit = async () => {
    setLoading(true);
    await FirestoreService.addPart(name, quantity);
    handleClose();
  };
  const handleChange = (event: any) => {
    const {
      target: { id, value },
    } = event;
    switch (id) {
      case "name":
        return setName(value);
      case "quantity":
        return setQuantity(parseInt(value));
      default:
        break;
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="simple-dialog-title"
    >
      <DialogTitle>Add a part</DialogTitle>
      <DialogContent className={classes.root}>
        <Container>
          <div>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      id="name"
                      type="text"
                      label="Part name"
                      placeholder="Oranges"
                      value={name}
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {" "}
                  <div>
                    <TextField
                      id="quantity"
                      type="number"
                      label="Part quantity"
                      value={quantity}
                      fullWidth
                    />
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </DialogContent>
      <DialogActions>
        <span className={classes.button}>
          <Button color="secondary" onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </span>
        <span className={classes.flex}></span>
        <span className={classes.button}>
          <Button
            color="primary"
            disabled={loading}
            variant="contained"
            onClick={handleSubmit}
          >
            {loading ? <CircularProgress size={25} /> : "Add part"}
          </Button>
        </span>
      </DialogActions>
    </Dialog>
  );
}
