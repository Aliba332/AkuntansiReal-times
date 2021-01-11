import {
  MenuItem,
  TextField,
  makeStyles,
  fade,
  Fab,
  Paper,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

import React from "react";

import NumberFormatCustom from "../../../utils/format_number";

import NumberFormat from "react-number-format";

import useStyles from "./styles";

const useStylesReddit = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    width: 65,
    transition: theme.transitions.create(["box-shadow", "width"]),
    "&$focused": {
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      zIndex: 4,
      width: 180,
      position: "absolute",
      left: 0,
    },
  },
  focused: {},
}));

const Penjualan = () => {
  const classes = useStylesReddit();
  const classing = useStyles();

  const Quantity = [
    {
      value: "",
      label: "non",
    },
    {
      value: "Kilogram",
      label: "Kg",
    },
    {
      value: "Pieces",
      label: "Pc",
    },
    {
      value: "Lusin",
      label: "Ls",
    },
    {
      value: "Liter",
      label: "Lt",
    },
  ];

  const items = [
    {
      value: "Penjualan",
      label: "Penjualan",
    },
    {
      value: "Retur Penjualan",
      label: "Retur Penjualan",
    },
    {
      value: "Pembelian",
      label: "Pembelian",
    },
    {
      value: "Retur Pembelian",
      label: "Retur Pembelian",
    },
    {
      value: "Biaya",
      label: "Biaya",
    },
    {
      value: "Pengambilan Pribadi",
      label: "Pengambilan Pribadi",
    },
  ];

  const [form, setForm] = React.useState({
    transaksi: "",
    banyak: "",
    quantity: "",
    nama_barang: "",
    harga: "",
  });

  const handleChangeItem = (prop) => (e) => {
    setForm({ ...form, [prop]: e.target.value });
  };

  return (
    <>
      <div className={classing.inputsend}>
        <Paper className={classing.teksGroup}>
          <div>
            <TextField
              name="transaksi"
              label="Transaksi"
              color="secondary"
              variant="outlined"
              select
              fullWidth
              size="small"
              onChange={handleChangeItem("transaksi")}
              value={form.transaksi}
            >
              {items.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Paper className={classing.field}>
            <TextField
              id="nama_barang"
              name="nama_barang"
              label={
                form.transaksi === "Biaya" ||
                form.transaksi === "Pengambilan Pribadi"
                  ? "Ket"
                  : "Nm.Brg"
              }
              onChange={handleChangeItem("nama_barang")}
              variant="outlined"
              size="small"
              InputProps={{ classes }}
            />

            <TextField
              className={classes.banyak}
              id="quantity"
              name="quantity"
              select
              label="Item"
              value={form.quantity}
              onChange={handleChangeItem("quantity")}
              size="small"
              variant="outlined"
              disabled={
                form.transaksi === "Biaya" ||
                form.transaksi === "Pengambilan Pribadi"
              }
              InputProps={{ classes }}
            >
              {Quantity.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="banyak"
              name="banyak"
              label="Unit"
              variant="outlined"
              size="small"
              onChange={handleChangeItem("banyak")}
              disabled={
                form.transaksi === "Biaya" ||
                form.transaksi === "Pengambilan Pribadi"
              }
              InputProps={{ classes }}
              type="number"
            />

            <TextField
              id="harga"
              name="harga"
              label="Harga"
              onChange={handleChangeItem("harga")}
              value={form.harga}
              variant="outlined"
              size="small"
              InputProps={{ classes, inputComponent: NumberFormatCustom }}
            />
            <NumberFormat
              value={form.harga * form.banyak}
              displayType={"text"}
              className={classing.typog}
              prefix="Rp "
              thousandSeparator={true}
            />
          </Paper>
        </Paper>
        <div>
          <Fab className={classing.fab} color="primary">
            <Send className={classing.iconSend} />
          </Fab>
        </div>
      </div>
    </>
  );
};

export default Penjualan;
