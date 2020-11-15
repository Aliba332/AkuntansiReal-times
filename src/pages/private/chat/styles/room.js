import { makeStyles } from "@material-ui/core/styles";
import bg from "../../../../image/bg.png";
export default makeStyles((theme) => ({
  contactBox: {
    display: "flex",
    flexFlow: "row nowrap",
    width: "80%",
    alignItems: "center"
  },
  contactAvatar: {
    marginRight: 5
  },
  contactNameWrap: {
    display: "flex",
    flexFlow: "column nowrap"
  },
  contactName: {
    marginBottom: -5
  },
  chatWindow: {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100%",
    margin: "0 auto 3",
    position: "relative",
    height: "calc(100vh - 70px)",
    overflowY: "auto",
    padding: "0 15px 65px"
  },
  chatDayWrap: {
    width: "fit-content",
    margin: "10px auto 10px",
    backgroundColor: "#4aedc4",
    padding: "0px 5px",
    borderRadius: 8,
    textAlign: "center"
  },

  sendInput: {
    width: "85%",
    bottom: 0,
    marginLeft: 15,
    backgroundColor: "#f5f5f5",
    border: "solid 1px #ddd",
    borderRadius: 50
  },

  moodInput: {
    display: "flex"
  },
  fab: {
    width: 50,
    height: 50,
    alignSelf: "flex-end"
  },

  chatInput: {
    minWidth: 320,
    width: "95%",
    justifyContent: "space-between",
    position: "fixed",
    display: "flex",
    left: 5,
    bottom: 10,
    textAlign: "left",
    padding: theme.spacing(1)
  },

  myChatBubble: {
    width: "100%",
    position: "relative",
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "space-between",
    marginBottom: 5,
    margin: "0 auto 5px",
    paddingLeft: 10
  },
  myTextBody: {
    width: "fit-content",
    maxWidth: "100%",
    backgroundColor: "#64b5f6",
    textAlign: "left",
    padding: 10,
    borderRadius: 8,
    position: "relative",
    alignSelf: "flex-end",
    "&::before": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      right: -10,
      top: 0,
      bottom: "auto",
      border: "12px solid",
      borderColor: "#64b5f6 transparent transparent transparent"
    }
  },
  myText: {
    color: "#263238",
    wordWrap: "break-word"
  },

  deliveryDetail: {
    position: "relative",
    textAlign: "right",
    display: "flex",
    flexDirection: "row-reverse"
  },
  timeStamp: {
    color: "#212121",
    fontSize: 12
  },
  deliveryIcons: {
    paddingLeft: 2,
    justifyContent: "center center"
  },

  iconRead: {
    width: 17,
    height: 17,
    color: "#ccff90"
  },
  iconSent: {
    width: 15,
    height: 15,
    color: "#69f0ae"
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
