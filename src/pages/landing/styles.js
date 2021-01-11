import { makeStyles } from "@material-ui/core/styles";
import bg from "../../image/bg.png";

const useStyles = makeStyles((theme) => ({
  landingBlock: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    height: "100vh",
    borderRadius: "0 0 100% 100%",
    position: "relative",
    "&:before": {
      content: '""',
      backgroundImage:
        "radial-gradient(50% 42%, " +
        theme.palette.primary.light +
        " 50%, " +
        theme.palette.primary.main +
        " 99%)",
      opacity: ".9",
      width: "100%",
      height: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 1,
    },
  },
  landingBox: {
    position: "relative",
    height: "100%",
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    flexFlow: "column nowrap",
  },
  logoBox: {
    width: 282,
    height: 69,
    margin: "auto",
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  btnBox: {
    width: 240,
    height: 120,
    position: "absolute",
    top: "auto",
    left: 0,
    right: 0,
    bottom: 20,
    margin: "auto",
    display: "flex",
    flexFlow: "column nowrap",
  },

  btnDaftar: {
    color: theme.palette.primary.main,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  btnLogin: {
    background: "transparent",
    color: "#fff",
    border: "solid 1px #fff",
  },
  buttons: {
    marginTop: theme.spacing(6),
  },
  dialog: {
    display: "flex",
    flexFlow: "column wrap",
  },
  daftar: {
    display: "flex",
    flexFLow: "row wrap",
    justifyContent: "space-between",
    marginTop: theme.spacing(3)
  },
  batal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing(5)
  },
}));

export default useStyles;
