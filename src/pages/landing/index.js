import React from "react";
import { Link, Redirect } from "react-router-dom";

import { useFirebase } from "../../components/FirebaseProvider";

import useStyles from "./styles";
import { Button } from "@material-ui/core";

import Logo from "../../image/logo.png";

export default function Landing() {
  const classes = useStyles();

  const { user } = useFirebase();

  if (user) {
    return <Redirect to="chat" />;
  }

  return (
    <div className={classes.landingBlock}>
      <div className={classes.landingBox}>
        <div className={classes.logoBox}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={classes.btnBox}>
          <Button
            className={classes.btnDaftar}
            variant="contained"
            component={Link}
            to="./registrasi"
          >
            Daftar
          </Button>

          <Button
            className={classes.btnLogin}
            variant="contained"
            component={Link}
            to="./login"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
