import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { unixToTime } from "../../../utils/datetime";

import { firestore, useFirebase } from "../../../components/FirebaseProvider";

import { useParams } from "react-router-dom";
import useStyles from "./styles/message-in";
import Hapus from "@material-ui/icons/HighlightOff";

export default function Messagein({ message }) {
  const params = useParams();
  const { user } = useFirebase();
  const classes = useStyles();
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    if (!message.is_read) {
      const readChat = async () => {
        try {
          await firestore
            .doc(`chats/${params.chatId}/messages/${message.id}`)
            .set(
              {
                is_read: true
              },
              { merge: true }
            );

          await firestore.doc(`chats/${params.chatId}`).set(
            {
              unread_count: {
                [user.uid]: 0
              }
            },
            { merge: true }
          );
        } catch (e) {
          console.log(e.message);
        }
      };

      readChat();
    }
  }, [message.is_read, message.id, params.chatId, user.uid]);

  const delPesan = async (e) => {
    e.preventDefault();
    setMsg(true);
    await firestore
      .doc(`chats/${params.chatId}/messages/${message.id}`)
      .delete();
    setMsg(false);
  };

  return (
    <React.Fragment>
      <div className={classes.yourChatBubble}>
        <div className={classes.yourTextBody}>
          <div className={classes.konten}>
            {message.text.split("\n").map((text, i) => {
              return (
                <Typography className={classes.myText} key={i}>
                  {text}
                </Typography>
              );
            })}

            <Hapus
              className={classes.hapus}
              onClick={delPesan}
              disabled={msg}
            />
          </div>
          <div className={classes.deliveryStamp}>
            <div className={classes.yourTimeStamp}>
              <Typography variant="caption">
                {unixToTime(
                  message.created_at && message.created_at.toMillis()
                )}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
