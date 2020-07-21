import React, { useEffect, useState, Fragment } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as FirestoreService from "../../middleware/admin";

import { dialogStyles } from "../../helpers/theme";

interface PartType {
  name: string;
  id: string;
  quantity: number;
  creaatedAt: string;
  updatedAt: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

function EditDialog(props: SimpleDialogProps) {
  const classes = dialogStyles();

  let { open, onClose } = props;
  const [parts, setParts] = useState([]);
  const [errors, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(true);
  const [openAuto, setOpen] = React.useState(false);
  const loadingAuto = open && parts.length === 0;
  const [part, setPart] = useState({} as PartType);
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState(0);

  useEffect(() => {
    const unsubscribe = FirestoreService.streamParts({
      next: (querySnapshot) => {
        const updatedParts = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        );
        setLoading(false);
        setParts(updatedParts);
      },
      error: () => setError("grocery-list-item-get-fail"),
    });
    return unsubscribe;
  }, ["parts", setParts]);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await FirestoreService.editPart(part.id, {
      name: newName,
      quantity: newQuantity,
    });
    handleClose();
    setPart({} as PartType);
    setNewName("");
    setNewQuantity(0);
    setDisable(true);
  };

  const handleChange = (event: any) => {
    const {
      target: { id, value },
    } = event;
    switch (id) {
      case "name":
        return setNewName(value);
      case "quantity":
        return setNewQuantity(parseInt(value));
      default:
        break;
    }
  };

  const autoChange = (e, v) => {
    if (v) {
      setPart(v);
      setNewName(v.name);
      setNewQuantity(v.quantity);
      setDisable(false);
    } else {
      setPart({} as PartType);
      setNewName("");
      setNewQuantity(0);
      setDisable(true);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Edit an item</DialogTitle>
      <DialogContent className={classes.rootEdit}>
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
                    <Autocomplete
                      id="asynchronous-demo"
                      open={openAuto}
                      onOpen={() => {
                        setOpen(true);
                      }}
                      onClose={(e) => {
                        setOpen(false);
                      }}
                      onChange={autoChange}
                      getOptionSelected={(option, value) =>
                        option.name === value.name
                      }
                      getOptionLabel={(option) => option.name}
                      options={parts}
                      loading={loadingAuto}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          label="Part name"
                          variant="outlined"
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <Fragment>
                                {loadingAuto ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </Fragment>
                            ),
                          }}
                        />
                      )}
                    />
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <TextField
                      id="name"
                      type="text"
                      label="Part name"
                      placeholder="Oranges"
                      value={newName}
                      fullWidth
                      disabled={disable}
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
                      value={newQuantity}
                      fullWidth
                      disabled={disable}
                      focused={!disable}
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
            {loading ? <CircularProgress size={25} /> : "Edit part"}
          </Button>
        </span>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
