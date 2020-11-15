import React, { useState } from "react";

import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  LinearProgress
} from "@material-ui/core";

import { useData } from "../../../components/DataProvider";
import {
  FieldValue,
  useFirebase,
  firestore
} from "../../../components/FirebaseProvider";

import isEmail from "validator/lib/isEmail";

import { useSnackbar } from "notistack";

export default function EditDialog({ open, handleClose, fieldMode }) {
  const { profile } = useData();
  const { user } = useFirebase();
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = useState({});

  const [form, setForm] = useState({
    nama: profile.nama,
    deskripsi: profile.deskripsi,
    email: user.email,
    password: ""
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError({
      ...error,
      [e.target.name]: ""
    });
  };

  const updateProfile = async () => {
    const fieldName = fieldMode.toLowerCase();

    if (!form[fieldName]) {
      return setError({
        [fieldName]: `${fieldMode} wajib diisi`
      });
    }
    setSubmitting(true);
    try {
      await firestore.doc(`profiles/${user.uid}`).set(
        {
          [fieldName]: form[fieldName],
          update_at: FieldValue.serverTimestamp()
        },
        { merge: true }
      );
      enqueueSnackbar(`${fieldMode} berhasil diperbaharui`, {
        variant: "success"
      });
      handleClose();
    } catch (e) {
      setError({
        [fieldName]: e.message
      });
    }
    setSubmitting(false);
  };

  const updateEmail = async (e) => {
    console.log(updateEmail);
    const { email } = form;
    if (!email) {
      setError({
        email: "email wajib diisi"
      });
    } else if (!isEmail(email)) {
      setError({
        email: "email tidak valid"
      });
    } else if (email !== user.email) {
      setError({
        email: ""
      });
      setSubmitting(true);

      try {
        await user.updateEmail(email);
        enqueueSnackbar("email berhasil diperbaharui", { variant: "success" });
        handleClose();
      } catch (e) {
        let emailError = "";
        switch (e.code) {
          case "auth/email-already-in-use":
            emailError = "Email telah dignakan oleh pengguna lain";
            break;
          case "auth/invalid-email":
            emailError = "Email tidak valid";
            break;
          case "auth/requires-recent-login":
            emailError =
              "Silahkan log out lalu login kembali untuk memperbaharui email";
            break;
          default:
            emailError = "Terjadi kesalahan, silahkan mencoba lagi";
            break;
        }
        setError({
          email: emailError
        });
      }
      setSubmitting(false);
    } else {
      handleClose();
    }
  };

  const updatePassword = async (e) => {
    const { password } = form;
    if (!password) {
      setError({
        password: "Password wajib diisi"
      });
    } else if (password.length < 6) {
      setError({
        email: "Password harus lebih dari enam karakter"
      });
    } else {
      setSubmitting(true);
      try {
        await user.updatePassword(password);
        enqueueSnackbar("password berhasil diperbaharui", {
          variant: "success"
        });
        handleClose();
      } catch (e) {
        let passwordError = "";

        switch (e.code) {
          case "auth/weak-password":
            passwordError = "password lemah";
            break;
          case "auth/requires-recent-login":
            passwordError =
              "Silahkan log out lalu login kembali untuk memperbaharui email";
            break;
          default:
            passwordError = "Terjadi kesalahan, silahkan logout dan coba lagi";
            break;
        }
        setError({
          password: passwordError
        });
      }
      setSubmitting(false);
    }
  };

  const handleSimpan = async (e) => {
    switch (fieldMode) {
      case "Email":
        await updateEmail();
        break;
      case "Password":
        await updatePassword();
        break;
      default:
        await updateProfile();
        break;
    }
  };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      open={open}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">Ubah {fieldMode}</DialogTitle>
      <DialogContent>
        {isSubmitting && <LinearProgress />}
        {fieldMode === "Nama" && (
          <TextField
            id="nama"
            name="nama"
            label="Nama"
            fullWidth
            margin="dense"
            autoFocus
            value={form.nama}
            onChange={handleChange}
            error={error.nama ? true : false}
            helperText={error.nama}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Deskripsi" && (
          <TextField
            id="deskripsi"
            name="deskripsi"
            label="Deskripsi"
            fullWidth
            margin="dense"
            autoFocus
            value={form.deskripsi}
            onChange={handleChange}
            error={error.deskripsi ? true : false}
            helperText={error.nama}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Email" && (
          <TextField
            id="email"
            name="email"
            label="Alamat email"
            fullWidth
            margin="dense"
            autoFocus
            value={form.email}
            onChange={handleChange}
            error={error.email ? true : false}
            helperText={error.nama}
            disabled={isSubmitting}
          />
        )}

        {fieldMode === "Password" && (
          <TextField
            id="password"
            name="password"
            label="Password"
            fullWidth
            margin="dense"
            autoFocus
            value={form.password}
            onChange={handleChange}
            error={error.password ? true : false}
            helperText={error.nama}
            disabled={isSubmitting}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={isSubmitting} onClick={handleClose} color="primary">
          Batal
        </Button>
        <Button disabled={isSubmitting} onClick={handleSimpan} color="primary">
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
