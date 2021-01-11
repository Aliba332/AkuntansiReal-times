import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

const Sebagai = ({ open, handleClose }) => {
    const classes= useStyles()
  return (
    <Dialog maxWidth="xs" open={open} >
      <DialogTitle>Anda akan mendaftar sebagai?</DialogTitle>
      <DialogContent className={classes.dialog}>
        <div className={classes.daftar}>
          <Button
            variant="contained"
            component={Link}
            to="./daftarowner"
            color="primary"
          >
            Pemilik
          </Button>
          <Button
            variant="text"
            component={Link}
            to="./daftarpencatat"
            color="secondary"
          >
            Pencatat
          </Button>
        </div>
        <Button onClick={handleClose} className={classes.batal}>Batal</Button>
      </DialogContent>
    </Dialog>
  );
};

export default Sebagai;
