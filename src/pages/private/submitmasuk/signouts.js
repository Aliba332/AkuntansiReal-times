import React from "react";

import { Button, Container, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";
import { auth } from "../../../components/FirebaseProvider";

function Signouts() {
  const classes = useStyles();
  const handleSignOut = () => {
    if (window.confirm("Apakah anda yakin ingin keluar dari aplikasi?"))
      auth.signOut();
  };

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="h6">
          Anda tidak dapat masuk dikarenakan anda belum memiliki izin dari
          pemilik
        </Typography>
        <Button variant="text" onClick={handleSignOut} className={classes.btnsignout}>
          signout
        </Button>
      </Paper>
    </Container>
  );
}

export default Signouts;
