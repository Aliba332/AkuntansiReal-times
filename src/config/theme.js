import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

const mainColor = blue[500];

export default createMuiTheme({
  palette: {
    primary: {
      main: mainColor,
      light: "#bbdefb",
      dark: "#0d47a1",
      contrasText: "#fff"
    },

    secondary: {
      main: "#5c6bc0",
      light: "#3f51b5",
      dark: "#1a237e",
      contrastText: "#fff"
    },
    textColor: {
      gray: "#bbbbbb",
      gray2: "#7d7d7d7d"
    },
    succes: {
      main: "#00FF00"
    },
    info: {
      main: "#30bcoc"
    },
    warning: {
      main: "#fdb31b"
    },
    danger: {
      main: "#ff0000"
    }
  }
});
