import React, { useState } from "react";
// import styles from "./styles1.module.css";
//memanggil textfiled dari material ui core
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  auth,
  firestore,
  FieldValue,
  useFirebase
} from "../../components/FirebaseProvider";
import isEmail from "validator/lib/isEmail";
import { Link, Redirect } from "react-router-dom";
import logo from "../../image/logo.png";

export default function Registrasi() {
  const classes = useStyles();
  // video aplikasi chat 6

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    ulangi_password: "",
    showPassword: false
  });

  const [error, setError] = useState({});

  const [isSubmitting, setSubmitting] = useState(false);

  const { user } = useFirebase();

  const handleChange = (prop) => (e) => {
    setForm({
      ...form,
      [prop]: e.target.value
    });
  };
  const handleClickShowPassword = () => {
    setForm({ ...form, showPassword: !form.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const validate = () => {
    let newErrors = {};

    if (!form.nama) {
      newErrors.nama = "Nama Wajib Diisi";
    }
    if (!form.email) {
      newErrors.email = "Email Wajib Diisi";
    } else if (!isEmail(form.email)) {
      newErrors.email = "Email tidak valid";
    }
    if (!form.password) {
      newErrors.password = "Password Wajib Diisi";
    }
    if (!form.ulangi_password) {
      newErrors.ulangi_password = "Ulangi Password Wajib Diisi";
    } else if (form.ulangi_password !== form.password) {
      newErrors.ulangi_password = "Password Tidak Sama";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    console.log(Object.values(findErrors));

    if (Object.values(findErrors).some((message) => message !== "")) {
      setError(findErrors);
    } else {
      setSubmitting(true);
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password
        );

        await firestore.doc(`profiles/${user.uid}`).set({
          nama: form.nama,
          createdAt: FieldValue.serverTimestamp()
        });
      } catch (e) {
        let newError = {};
        console.log(e.message);

        switch (e.code) {
          case "auth/email-already-in-use":
            newError.email = "Email Sudah Terdaftar";
            break;

          case "auth/invalid-email":
            newError.email = "Email Tidak valid";
            break;

          case "auth/weak-password":
            newError.password = "password lemah";
            break;
          case "auth/operation-not-allowed":
            newError.email = "Metode Email dan Password Tidak Di Dukung";
            break;

          default:
            newError.email = "Terjadi Kesalahan, Silahkan Coba Lagi";
            break;
        }
        setError(newError);
      }
      setSubmitting(false);
    }
  };

  if (user) {
    return <Redirect to="/chat" />;
  }

  return (
    <div className={classes.daftarBlock}>
      <div className={classes.daftarBox}>
        <div className={classes.logoBox}>
          <img src={logo} alt="logo" />
        </div>
        <Container maxwidth="xs">
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h1" className={classes.title}>
              Buat Akun Baru
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                id="nama"
                name="nama"
                label="Nama"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                value={form.nama}
                onChange={handleChange("nama")}
                // menampilkan pesan error dari console sebagai text field
                error={error.nama ? true : false}
                helperText={error.nama}
                // diambil dari setsubmitting
                disabled={isSubmitting}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                // menampilkan pesan error dari console sebagai text field
                error={error.email ? true : false}
                helperText={error.email}
                // diambil dari setsubmitting
                disabled={isSubmitting}
              />
              <TextField
                id="password"
                type={form.showPassword ? "text" : "password"}
                name="password"
                label="Password"
                autoComplete="now-password"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                value={form.password}
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        color="primary"
                        size="small"
                        edge="end"
                      >
                        {form.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                // menampilkan pesan error dari console sebagai text field
                error={error.password ? true : false}
                helperText={error.password}
                // diambil dari setsubmitting
                disabled={isSubmitting}
              />
              <TextField
                id="ulangi_password"
                type={form.showPassword ? "text" : "password"}
                name="ulangi_password"
                label="Ulangi Password"
                autoComplete="now-password"
                margin="normal"
                fullWidth
                required
                variant="outlined"
                value={form.ulangi_password}
                onChange={handleChange("ulangi_password")}
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
                  )
                }}
                // menampilkan pesan error dari console sebagai text field
                error={error.ulangi_password ? true : false}
                helperText={error.ulangi_password}
                // diambil dari setsubmitting
                disabled={isSubmitting}
              />
              <Grid container className={classes.buttons}>
                <Grid item xs>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    size="large"
                    // diambil dari setsubmitting
                    disabled={isSubmitting}
                  >
                    Daftar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    variant="contained"
                    size="large"
                    color="secondary"
                    // diambil dari setsubmitting
                    disabled={isSubmitting}
                    to="./login"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
