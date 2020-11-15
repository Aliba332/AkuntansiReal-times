import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useCollectionData } from "react-firebase-hooks/firestore";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Grid, Fab } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CheckIcon from "@material-ui/icons/Check";
import BackIcon from "@material-ui/icons/ArrowBack";
import SendIcon from "@material-ui/icons/Send";
import Hapus from "@material-ui/icons/HighlightOff";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import {
  unixToTime,
  unixToIsoDate,
  isoToRelative
} from "../../../utils/datetime";

import groupBy from "lodash/groupBy";

import AppHeader from "../../../components/AppBar";

import { useData } from "../../../components/DataProvider";
import {
  useFirebase,
  firestore,
  FieldValue
} from "../../../components/FirebaseProvider";

import MessageIn from "./message-in";
import useStyles from "./styles/room";

import { animateScroll as scroll } from "react-scroll";

export default function Room({ message }) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();

  const { chats, profile } = useData();
  const { user } = useFirebase();

  const [activeChat, setActiveChat] = useState({});
  const [activeContact, setActiveContact] = useState({});
  const [msg, setMsg] = useState(false);

  const textRef = useRef(null);

  const [isSending, setSending] = useState(false);

  const activeChatDocRef = firestore.doc(`chats/${params.chatId}`);
  const messagesColRef = activeChatDocRef.collection("messages");

  const [messages] = useCollectionData(
    messagesColRef.orderBy("created_at", "asc"),
    { idField: "id" }
  );

  useLayoutEffect(() => {
    scroll.scrollToBottom({
      containerId: "chatWindow",
      offset: 0,
      isDynamic: true,
      duration: 10
    });
  }, [messages]);

  useEffect(() => {
    const findChat = chats.find((chat) => chat.id === params.chatId);

    if (findChat) {
      setActiveChat(findChat);
      let findActiveContact = {};
      if (findChat.user_profiles) {
        const findContactId = Object.keys(findChat.user_profiles).find(
          (uid) => uid !== user.uid
        );

        findActiveContact =
          findContactId && findChat.user_profiles[findContactId];

        setActiveContact(findActiveContact);
      }
    }
  }, [chats, params.chatId, user.uid]);

  const sendChat = async (e) => {
    e.preventDefault();

    if (textRef.current.value) {
      try {
        setSending(true);
        await activeChatDocRef.set(
          {
            updated_at: FieldValue.serverTimestamp(),
            last_message: {
              from_user_id: user.uid,
              text: textRef.current.value,
              created_ad: FieldValue.serverTimestamp()
            },

            unread_count: {
              [user.uid]: 0,
              [activeContact.id]: FieldValue.increment(1)
            },
            user_profiles: {
              [user.uid]: profile,
              [activeContact.id]: activeContact
            }
          },
          {
            merge: true
          }
        );

        await messagesColRef.add({
          from_user_id: user.uid,
          to_user_id: activeContact.id,
          text: textRef.current.value,
          created_at: FieldValue.serverTimestamp(),
          is_read: false
        });

        textRef.current.value = "";
        setSending(false);
      } catch (e) {
        console.log(e.message);
        setSending(false);
      }
    }
  };
  const isTyping = (is_typing) => async (e) => {
    await activeChatDocRef.set(
      {
        is_typing: {
          [user.uid]: is_typing
        }
      },
      {
        merge: true
      }
    );
  };
  const messagesGroupByDate =
    messages &&
    groupBy(messages, (message) => {
      return unixToIsoDate(message.created_at && message.created_at.toMillis());
    });

  return (
    <>
      <AppHeader
        toolbarContent={
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back to home"
              onClick={() => {
                history.push("/chat");
              }}
            >
              <BackIcon />
            </IconButton>

            <div className={classes.contactBox}>
              <Avatar
                className={classes.contactAvatar}
                alt={activeContact.nama}
                src={activeContact.foto}
              />
              <div className={classes.contactNameWrap}>
                <Typography component="h1" variant="h6" color="inherit" noWrap>
                  {activeContact.nama}
                </Typography>

                {activeChat.is_typing &&
                activeChat.is_typing[activeContact.id] ? (
                  <Typography variant="caption">sedang mengetik...</Typography>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        }
      />

      <div id="chatWindow" className={classes.chatWindow}>
        {messagesGroupByDate &&
          Object.keys(messagesGroupByDate).map((dateStr) => {
            return (
              <React.Fragment key={dateStr}>
                <div className={classes.chatDayWrap}>
                  <Typography className={classes.chatDayWrap} variant="h5">
                    {isoToRelative(dateStr)}
                  </Typography>
                </div>
                {messagesGroupByDate[dateStr].map((message) => {
                  if (message.from_user_id !== user.uid) {
                    return <MessageIn key={message.id} message={message} />;
                  }
                  return (
                    <React.Fragment key={message.id}>
                      <div className={classes.myChatBubble}>
                        <div className={classes.myTextBody}>
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
                              onClick={async (e) => {
                                e.preventDefault();
                                setMsg(true);
                                await messagesColRef
                                  .doc(`${message.id}`)
                                  .delete();
                                setMsg(false);
                              }}
                              disabled={msg}
                            />
                          </div>

                          <div className={classes.deliveryDetail}>
                            <div className={classes.deliveryIcons}>
                              {message.is_read && (
                                <DoneAllIcon className={classes.iconRead} />
                              )}
                              {!message.is_read && (
                                <CheckIcon className={classes.iconSent} />
                              )}
                            </div>
                            <div className={classes.timeStamp}>
                              <Typography variant="caption">
                                {unixToTime(
                                  message.created_at &&
                                    message.created_at.toMillis()
                                )}
                              </Typography>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
      </div>
      <div className={classes.chatInput}>
        <form onSubmit={sendChat} className={classes.sendInput}>
          <Grid container direction="column" justify="center" spacing={3}>
            <Grid item xs={12}>
              <div className={classes.moodInput}>
                <IconButton>
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <InputBase
                  inputProps={{
                    ref: textRef
                  }}
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rowsMax={2}
                  placeholder="Ketik pesan"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.shiftKey) {
                      sendChat(e);
                    }
                  }}
                  onFocus={isTyping(true)}
                  onBlur={isTyping(false)}
                />
              </div>
            </Grid>
          </Grid>
        </form>

        <Fab
          onClick={sendChat}
          className={classes.fab}
          color="secondary"
          disabled={isSending}
        >
          <IconButton>
            <SendIcon color="primary" />
          </IconButton>
        </Fab>
      </div>
    </>
  );
}
