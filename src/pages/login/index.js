import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import isEmail from "validator/lib/isEmail";

import useStyles from "./styles";
import logo from "../../image/logo.png";

import { auth, useFirebase } from "../../components/FirebaseProvider";
import Sebagai from "../landing/sebagai";

function Login() {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [dialogDaftar, setDialogDaftar] = useState({
    open: false,
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const { user } = useFirebase();

  const [error, setError] = useState({});

  const handleChange = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!isEmail(form.email)) {
      newErrors.email = "Email tidak valid";
    }

    if (!form.password) {
      newErrors.password = "Password wajib diisi";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some((message) => message !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);
      try {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } catch (e) {
        let newError = {};

        switch (e.code) {
          case "auth/user-not-found":
            newError.email = "Email tidak terdaftar";
            break;
          case "auth/invalid-email":
            newError.email = "Email tidak valid";
            break;
          case "auth/wrong-password":
            newError.password = "Password salah";
            break;
          case "auth/user-disabled":
            newError.email = "Pengguna di blokir";
            break;
          default:
            newError.email = "Terjadi kesalahan silahkan coba lagi";
            break;
        }

        setError(newError);
      }

      setSubmitting(false);
    }
  };

  if (user) {
    return <Redirect to="/submitmasuk" />;
  }

  return (
    <div className={classes.loginBlock}>
      <div className={classes.loginBox}>
        <div className={classes.logoBox}>
          <img src={logo} alt="logo" />
        </div>
        <Container maxWidth="xs">
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>
              Log In
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Alamat Email"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                onChange={handleChange("email")}
                value={form.email}
                error={error.email ? true : false}
                helperText={error.email}
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                type={form.showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                error={error.password ? true : false}
                helperText={error.password}
                disabled={isSubmitting}
                autoComplete="on"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        color="primary"
                        size="small"
                      >
                        {form.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container className={classes.buttons}>
                <Grid item xs>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => {
                      setDialogDaftar({
                        open: true,
                      });
                    }}
                  >
                    Daftar
                  </Button>
                </Grid>
              </Grid>
              <div className={classes.forgotPassword}>
                <Typography
                  className={classes.lupaLink}
                  component={Link}
                  to="./lupa-password"
                >
                  Lupa Password?
                </Typography>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
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
  );
}
export default Login;
