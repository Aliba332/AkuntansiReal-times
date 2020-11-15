import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  yourChatBubble: {
    width: "100%",
    position: "relative",
    display: "flex",
    left: 10,
    marginBottom: 5,
    paddingRight: 10,
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    margin: "0 auto 10px"
  },
  yourTextBody: {
    width: "fit-content",
    maxWidth: "100%",
    backgroundColor: "#e0e0e0",
    textAlign: "left",
    padding: 10,
    borderRadius: 8,
    position: "relative",
    flexFlow: "row nowrap",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      left: -10,
      right: "auto",
      top: 0,
      bottom: "auto",
      border: "12px solid",
      borderColor: "#e0e0e0 transparent transparent transparent"
    }
  },

  deliveryStamp: {
    display: "flex",
    flexDirection: "row-reverse"
  },
  yourTimeStamp: {
    color: theme.palette.primary.main,
    fontSize: 9
  },
  myText: {
    color: "primary",
    wordWrap: "break-word"
  },

  konten: {
    display: "flex",
    alignItems: "flex-end"
  },

  hapus: {
    paddingLeft: 5,
    paddingBottom: 7
  }
}));
