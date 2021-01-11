import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexFlow: "column nowrap",
    marginTop: theme.spacing(8),
    padding: theme.spacing(6),
    textAlign: "center",
  },
  btnsignout: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
