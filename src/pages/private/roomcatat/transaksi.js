import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Slide,
  TextField,
  Typography,
  Toolbar,
  Fab,
  Paper,
} from "@material-ui/core";
import { Add, Close, Send } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import React, { useLayoutEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import NumberFormat from "react-number-format";
import { useData } from "../../../components/DataProvider";
import { FieldValue, firestore } from "../../../components/FirebaseProvider";
import NumberFormatCustom from "../../../utils/format_number";

import useStyles from "./styles";

import { animateScroll as scroll } from "react-scroll";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Transaksi({ open, handleClose, fieldMode }) {
  const classes = useStyles();
  const { transaksi, profile } = useData();
  const { enqueueSnackbar } = useSnackbar();
  const [tambahBarang, setTambahBarang] = useState({
    nama_barang: "",
    harga_jual: "",
    harga_beli: "",
    stok_barang: "",
  });

  const [form, setForm] = useState({ harga: "", jumlahItem: "" });

  const onChangeForm = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  const [isSending, setSending] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (prop) => (e) => {
    setTambahBarang({ ...tambahBarang, [prop]: e.target.value });
  };

  const transaksiId = transaksi
    .filter((trans) => (trans.id_catat = profile.id))
    .map((map) => map.id);

  const listBarangColRef = firestore
    .doc(`transaksi/${transaksiId}`)
    .collection("list_barang");

  const messageColRef = firestore
    .doc(`transaksi/${transaksiId}`)
    .collection("messages");

  const [list_barang] = useCollectionData(
    listBarangColRef.orderBy("nama_barang", "asc"),
    {
      idField: "id",
    }
  );

  useLayoutEffect(() => {
    scroll.scrollToBottom({
      containerId: "chatWindow",
      offset: 0,
      isDynamic: true,
      duration: 10,
    });
  }, [list_barang]);

  const validate = () => {
    let newErrors = {};

    if (!tambahBarang.nama_barang) {
      newErrors.nama_barang = "Wajib";
    }
    if (!tambahBarang.harga_jual) {
      newErrors.harga_jual = "Wajib";
    }
    if (!tambahBarang.harga_beli) {
      newErrors.harga_beli = "Wajib";
    }
    if (!tambahBarang.stok_barang) {
      newErrors.stok_barang = "Wajib";
    }
    return newErrors;
  };

  const handleTambahBarang = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some((message) => message !== "")) {
      setError(findErrors);

      enqueueSnackbar(`semua field tambah item wajib diisi`, {
        variant: "error",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      });
    } else {
      setSending(true);
      if (transaksiId) {
        try {
          const listBarang = {
            nama_barang: tambahBarang.nama_barang,
            harga_jual: Number(tambahBarang.harga_jual),
            harga_beli: Number(tambahBarang.harga_beli),
            stok_barang: Number(tambahBarang.stok_barang),
          };
          await listBarangColRef.doc(tambahBarang.nama_barang).set(listBarang);

          setTambahBarang({
            nama_barang: "",
            harga_jual: "",
            harga_beli: "",
            stok_barang: "",
          });
          setSending(false);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  };

  const StatusAktif = transaksi.map((e) => e.status_aktif);

  const sendTransaksiPenjualan = (barang) => async (e) => {
    e.preventDefault();

    if (StatusAktif[0] === false) {
      return enqueueSnackbar(
        `anda tidak dapat mengirim pesan transaksi, sebab status anda tidak aktif`,
        {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }
      );
    } else if (StatusAktif[0] === true) {
      handleClose();
      const newMessageData = {
        transaksi: fieldMode,
        harga: barang.harga_jual,
        total_harga: barang.harga_jual * form.jumlahItem,
        banyak_item: Number(form.jumlahItem),
        nama_barang: barang.nama_barang,
        stok_barang: barang.stok_barang - form.jumlahItem,
        update_at: FieldValue.serverTimestamp(),
      };

      try {
        await messageColRef.add(newMessageData);
        await listBarangColRef.doc(barang.nama_barang).set(
          {
            stok_barang: barang.stok_barang - Number(form.jumlahItem),
          },
          { merge: true }
        );
      } catch (e) {
        console.log(e.message);
      }
      form.jumlahItem = "";
    }
  };

  const sendTransaksiPembelian = (barang) => async (e) => {
    e.preventDefault();

    if (StatusAktif[0] === false) {
      return enqueueSnackbar(
        `anda tidak dapat mengirim pesan transaksi, sebab status anda tidak aktif`,
        {
          variant: "error",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }
      );
    } else if (StatusAktif[0] === true) {
      handleClose();
      const newMessageData = {
        transaksi: fieldMode,
        harga: barang.harga_beli,
        total_harga: barang.harga_beli * form.jumlahItem,
        banyak_item: Number(form.jumlahItem),
        nama_barang: barang.nama_barang,
        stok_barang: barang.stok_barang + Number(form.jumlahItem),
        update_at: FieldValue.serverTimestamp(),
      };

      try {
        await messageColRef.add(newMessageData);
        await listBarangColRef.doc(barang.nama_barang).set(
          {
            stok_barang: barang.stok_barang + Number(form.jumlahItem),
          },
          { merge: true }
        );
      } catch (e) {
        console.log(e.message);
      }
      form.jumlahItem = "";
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.dialogAppbar} color="primary">
        <Toolbar>
          <IconButton edge="start" onClick={handleClose} aria-label="close">
            <Close />
          </IconButton>
          <Typography variant="h5">{fieldMode}</Typography>
        </Toolbar>
      </AppBar>

      <div id="chatWindow" className={classes.chatWindow}>
        {fieldMode === "Penjualan" && (
          <List>
            {list_barang &&
              Object.values(list_barang).map((barang) => {
                return (
                  <React.Fragment key={barang.id}>
                    <ListItem className={classes.listItem}>
                      <div className={classes.merek}>
                        <Typography variant="h6" className={classes.typogAdd}>
                          {barang.nama_barang}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          className={classes.stok}
                        >
                          Stok : {barang.stok_barang}
                        </Typography>
                      </div>

                      <div>
                        <TextField
                          name="harga"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            className: classes.textFieldAdd1,
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                          size="small"
                          label="Harga Jual"
                          value={barang.harga_jual}
                        />
                        <Typography variant="caption">Total :</Typography>
                        <NumberFormat
                          value={barang.harga_jual * form.jumlahItem}
                          displayType={"text"}
                          className={classes.typog}
                          prefix="Rp "
                          thousandSeparator={true}
                        />
                      </div>
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fabField}
                          color="secondary"
                          onClick={sendTransaksiPenjualan(barang)}
                        >
                          <Send />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
          </List>
        )}

        {fieldMode === "Pembelian" && (
          <List>
            {list_barang &&
              Object.values(list_barang).map((barang) => {
                if (!barang.nama_barang) {
                  return null;
                }
                return (
                  <React.Fragment key={barang.id}>
                    <ListItem className={classes.listItem}>
                      <div className={classes.merek}>
                        <div className={classes.typogAdd}>
                          <Typography variant="h6">
                            {barang.nama_barang}
                          </Typography>
                        </div>

                        <Typography
                          variant="subtitle1"
                          className={classes.stok}
                        >
                          Stok: {barang.stok_barang}
                        </Typography>
                      </div>

                      <div>
                        <TextField
                          name="harga"
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            className: classes.textFieldAdd1,
                            inputComponent: NumberFormatCustom,
                          }}
                          variant="outlined"
                          size="small"
                          label="Harga Beli"
                          value={barang.harga_beli}
                        />

                        <NumberFormat
                          value={barang.harga_beli * form.jumlahItem}
                          displayType={"text"}
                          className={classes.typog}
                          prefix="Rp "
                          thousandSeparator={true}
                        />
                      </div>
                      <ListItemSecondaryAction>
                        <Fab
                          className={classes.fabField}
                          color="secondary"
                          onClick={sendTransaksiPembelian(barang)}
                        >
                          <Send />
                        </Fab>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
          </List>
        )}
      </div>

      <Paper className={classes.textFieldAdd2}>
        <TextField
          name="jumlahItem"
          color="secondary"
          variant="outlined"
          label="Banyak"
          type="number"
          size="small"
          value={form.jumlahItem}
          onChange={onChangeForm("jumlahItem")}
          disabled={fieldMode === "Biaya" ? true : false}
        />
      </Paper>

      {fieldMode === "Biaya" ? undefined : (
        <AppBar position="fixed" color="secondary" className={classes.appbar}>
          <Toolbar className={classes.tbContent}>
            <Typography
              variant="subtitle1"
              align="left"
              className={classes.typogAdd}
            >
              Tambah Item
            </Typography>
            <div className={classes.appBarItem}>
              <TextField
                className={classes.textfieldAddItem}
                name="nama_barang"
                variant="outlined"
                size="small"
                label="Nm Item"
                value={tambahBarang.nama_barang}
                onChange={handleChange("nama_barang")}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldAddLabel,
                }}
                disabled={isSending}
                error={error.nama_barang ? true : false}
                helperText={error.nama_barang}
                required
              />
              <TextField
                className={classes.textfieldAddItem}
                name="harga_jual"
                variant="outlined"
                size="small"
                label="Hrg Jual"
                value={tambahBarang.harga_jual}
                onChange={handleChange("harga_jual")}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldAddLabel,
                }}
                disabled={isSending}
                error={error.harga_jual ? true : false}
                helperText={error.harga_jual}
                required
              />
              <TextField
                className={classes.textfieldAddItem}
                name="harga_beli"
                variant="outlined"
                size="small"
                label="Hrg Beli"
                value={tambahBarang.harga_beli}
                onChange={handleChange("harga_beli")}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldAddLabel,
                }}
                disabled={isSending}
                error={error.harga_beli ? true : false}
                helperText={error.harga_beli}
                required
              />
              <TextField
                className={classes.textfieldAddItem}
                name="stok_barang"
                variant="outlined"
                size="small"
                label="Stok Item"
                value={tambahBarang.stok_barang}
                onChange={handleChange("stok_barang")}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldAddLabel,
                }}
                disabled={isSending}
                error={error.stok_barang ? true : false}
                helperText={error.stok_barang}
                required
              />
              <Fab
                className={classes.fabAdd}
                onClick={handleTambahBarang}
                disabled={isSending}
              >
                <Add />
              </Fab>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </Dialog>
  );
}
