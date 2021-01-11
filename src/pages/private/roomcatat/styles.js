import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pemisah: {
    display: "flex",
    flexFlow: "column nowrap",
  },

  // index.js
  chatWindowIndex: {
    width: "100%",
    margin: "0 auto 3",
    position: "relative",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: "0 0 65px",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "3px 0px",
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    alignSelf: "center",
  },
  nama: {
    display: "flex",
    flexGrow: 2,
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignContent: "center",
  },

  day: {
    width: "fit-content",
    margin: "10px auto 10px",
    backgroundColor: "#4aedc4",
    padding: "0px 5px",
    borderRadius: 8,
    textAlign: "center",
  },
  fullTransaksi: {
    marginBottom: theme.spacing(2),
    marginLeft: 5,
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "#90a4ae",
    padding: "3px 17px ",
    borderRadius: 10,
    position: "relative",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      top: 23,
      left: 0,

      border: "1px solid",
      borderColor: "#fafafa",
    },
  },

  pesan: {
    display: "flex",
    flexFlow: "row nowrap",
    marginTop: 5,
  },

  titlePesan: {
    fontWeight: "bold",
    marginLeft: -5,
  },

  fieldIndex: {
    width: 70,
    backgroundColor: "#efebe9",
    borderRadius: 5,
    height: "fit-content",
    marginLeft: 5,
    paddingLeft: 5,
  },

  fieldIndexHarga: {
    width: 110,
    backgroundColor: "#efebe9",
    borderRadius: 5,
    height: "fit-content",
    marginLeft: 5,
    paddingLeft: 5,
  },

  fieldIndexItem: {
    width: 30,
    backgroundColor: "#efebe9",
    borderRadius: 5,
    height: "fit-content",
    marginLeft: 5,
    textAlign: "center",
  },

  fab: {
    height: 40,
    width: 40,
  },

  //transaksi.js

  chatWindow: {
    width: "100%",
    margin: "0 auto 3",
    position: "relative",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: "0 15px 65px",
  },
  typog: {
    position: "absolute",
    marginLeft: 5,
    zIndex: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  appbar: {
    top: "auto",
    display: "flex",
    bottom: 0,
  },
  div: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
    marginRight: 3,
  },
  dialogAppbar: {
    position: "relative",
  },
  fabAdd: {
    backgroundColor: theme.palette.primary.light,
    height: 30,
    width: 90,
    left: 5,
    bottom: 10,
  },
  listItem: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },

  tbContent1: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
  },

  tbContent: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "space-between",
  },

  appBarItem: {
    display: "flex",
    flexFlow: "row nowrap",
    left: 4,
  },
  textfieldAddItem: {
    bottom: 10,
    backgroundColor: "white",
  },
  textFieldAddLabel: {
    backgroundColor: "primary",
    fontWeight: "bold",
    top: 4,
  },

  textFieldAdd1: {
    height: 30,
    width: 150,
  },
  textFieldAdd2: {
    position: "fixed",
    backgroundColor: "#eeeeee",
    top: "auto",
    bottom: 110,
    left: 7,
    zIndex: 5,
    width: 150,
    margin: "10px auto 10px",
    padding: 10,
  },

  typogAdd: {
    marginBottom: 13,
    width: 120,
  },
  merek: {
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stok: {
    marginLeft: theme.spacing(3),
    alignItems: "center",
  },
  fabField: {
    height: 40,
    width: 40,
    right: 3,
  },
}));

export default useStyles;
