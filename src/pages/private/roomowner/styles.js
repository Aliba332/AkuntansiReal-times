import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  //view room

  switch: {
    alignSelf: "center",
    alignItems: "center",
    marginRight: -10,
  },
  typog: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  sTypog: {
    display: "flex",
    flexFlow: "column nowrap",
  },
  typos: {
    textAlign: "center",
  },

  chatWindowIndex: {
    width: "100%",
    margin: "0 auto 3",
    position: "relative",
    height: "calc(95vh - 70px)",
    overflowY: "auto",
    padding: "0 0 65px",
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
  tbContent1: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-around",
  },
  fab: {
    height: 40,
    width: 40,
  },

  //ownerlist.js
  content: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: theme.spacing(2),
    alignSelf: "center",
  },
  tabs: {
    justifyContent: "space-between",
  },
  transaksi: {
    dispaly: "flex",
    flexFlow: "row nowrap",
  },
  profil: {
    display: "flex",
    flexGrow: 2,
    flexFlow: "column nowrap",
    justifyContent: "center",
    alignContent: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconbutton: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  list: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
  },
}));

export default useStyles;
