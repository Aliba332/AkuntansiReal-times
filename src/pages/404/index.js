import React from "react";
import { Link } from "react-router-dom";

import { Container, Paper, Typography } from "@material-ui/core";

import useStyles from "./styles";

function NotFound() {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={classes.paper}>
        <Typography variant="subtiitle2"> Halaman Tidak Ditemukan </Typography>
        <Typography variant="h3" color="warning">
          404
        </Typography>
        <Typography component={Link} to="/">
          Kembali Ke Beranda
        </Typography>
      </Paper>
    </Container>
  );
}

export default NotFound;
