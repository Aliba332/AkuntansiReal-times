import React, { useState } from "react";

import useStyles from "./styles";
import { Button } from "@material-ui/core";

import Logo from "../../image/logo.png";
import Sebagai from "./sebagai";
import { Link, Redirect } from "react-router-dom";
import { useFirebase } from "../../components/FirebaseProvider";

export default function Landing() {
  const classes = useStyles();
  const {user} = useFirebase();

  const [dialogDaftar, setDialogDaftar] = useState({
    open: false,
  });

  if (user) {
    return <Redirect to="/submitmasuk" />;
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
            onClick={() => {
              setDialogDaftar({
                open: true,
              });
            }}
          >
            Daftar
          </Button>

          <Button
            className={classes.btnLogin}
            variant="contained"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Sebagai
            {...dialogDaftar}
            handleClose={() => {
              setDialogDaftar((dialogDaftar) => ({
                ...dialogDaftar,
                open: false,
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
