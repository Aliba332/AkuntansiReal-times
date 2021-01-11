import {
  AppBar,
  Avatar,
  Divider,
  Fab,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "../../../components/AppBar";
import useStyles from "./styles";
import { useData } from "../../../components/DataProvider";
import { ArrowBack } from "@material-ui/icons";
import { firestore, useFirebase } from "../../../components/FirebaseProvider";
import icaccounting from "../../../image/budget.png";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { animateScroll as scroll } from "react-scroll";
import { groupBy } from "lodash";
import { isoToRelative, unixToIsoDate } from "../../../utils/datetime";
import NumberFormat from "react-number-format";

import Cash from "../../../image/cash.png";
import Box from "../../../image/box.png";
import Biaya from "../../../image/iconbiaya.png";

const ViewRoomOwner = () => {
  const classes = useStyles();
  const history = useHistory();
  const { profile, transaksi } = useData();
  const params = useParams();
  const { user } = useFirebase();
  const activeTransaksiDocRef = firestore.doc(
    `transaksi/${params.transaksiId}`
  );

  const [activeTransaksi, setActiveTransaksi] = useState({});
  const [activeContact, setActiveContact] = useState({});

  const namaperusahaan = profile.nama_perusahaan.replace(/\s/g, "");

  const [state, setState] = useState({});

  const messageColRef = firestore
    .doc(`transaksi/${params.transaksiId}`)
    .collection("messages");

  const [messages] = useCollectionData(
    messageColRef.orderBy("nama_barang", "asc"),
    { idField: "id" }
  );

  useLayoutEffect(() => {
    scroll.scrollToBottom({
      containerId: "chatWindowIndex",
      offset: 0,
      isDynamic: true,
      duration: 10,
    });
  }, [messages]);

  const handleChange = async (e) => {
    e.preventDefault();

    await activeTransaksiDocRef.set(
      {
        status_aktif: !state,
      },
      { merge: true }
    );
  };

  useEffect(() => {
    const findTransaksi = transaksi.find(
      (trans) => trans.id === params.transaksiId
    );

    if (findTransaksi) {
      setActiveTransaksi(findTransaksi);
      let findActiveContact = {};
      if (findTransaksi.user_profiles) {
        const findContactId = Object.keys(findTransaksi.user_profiles).find(
          (uid) => uid !== user.uid
        );

        findActiveContact =
          findContactId && findTransaksi.user_profiles[findContactId];

        setActiveContact(findActiveContact);
      }
    }
    setState(activeTransaksi.status_aktif);
  }, [transaksi, params.transaksiId, user.uid, activeTransaksi.status_aktif]);

  const messagesGroupByDate =
    messages &&
    groupBy(messages, (message) => {
      return unixToIsoDate(message.update_at && message.update_at.toMillis());
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
                history.push(`/owner/${namaperusahaan}`);
              }}
            >
              <ArrowBack />
            </IconButton>
            <div className={classes.content}>
              <Avatar className={classes.avatar}>
                <img src={icaccounting} alt={activeContact.nama} />
              </Avatar>

              <div className={classes.profil}>
                <Typography component="h1" variant="subtitle1">
                  {activeContact.nama}
                </Typography>
                <Typography variant="subtitle2">
                  {activeContact.nama_perusahaan}
                </Typography>
                <Typography variant="subtitle2">
                  {activeContact.cabang}
                </Typography>
              </div>
              <div className={classes.switch}>
                <div className={classes.sTypog}>
                  <Switch
                    color="secondary"
                    checked={state === true ? true : false}
                    onChange={handleChange}
                    name="status_aktif"
                  />
                  <Typography variant="caption" className={classes.typos}>
                    {activeTransaksi.status_aktif === true
                      ? "aktif"
                      : "tidak aktif"}
                  </Typography>
                </div>
              </div>
            </div>
          </>
        }
      />

      <>
        <div id="chatWindowIndex" className={classes.chatWindowIndex}>
          {messagesGroupByDate &&
            Object.keys(messagesGroupByDate).map((dateStr) => {
              return (
                <React.Fragment key={dateStr}>
                  <div className={classes.day}>
                    <Typography className={classes.day} variant="h5">
                      {isoToRelative(dateStr)}
                    </Typography>
                  </div>

                  {messagesGroupByDate[dateStr].map((message) => {
                    return (
                      <React.Fragment key={message.id}>
                        <div className={classes.fullTransaksi}>
                          {message.transaksi.split("\n").map((pesan, i) => {
                            return (
                              <Typography
                                key={i}
                                variant="caption"
                                className={classes.titlePesan}
                              >
                                {pesan}
                              </Typography>
                            );
                          })}

                          <div className={classes.pesan}>
                            <div className={classes.fieldIndex}>
                              {message.nama_barang
                                .split("\n")
                                .map((pesan, i) => {
                                  return (
                                    <Typography key={i} variant="caption">
                                      {pesan}
                                    </Typography>
                                  );
                                })}
                            </div>
                            <div className={classes.fieldIndexHarga}>
                              {String(message.harga)
                                .split("\n")
                                .map((pesan, i) => {
                                  return (
                                    <NumberFormat
                                      key={i}
                                      value={pesan}
                                      displayType={"text"}
                                      prefix="Rp "
                                      thousandSeparator={true}
                                    />
                                  );
                                })}
                            </div>

                            <div className={classes.fieldIndexItem}>
                              {String(message.banyak_item)
                                .split("\n")
                                .map((pesan, i) => {
                                  return (
                                    <Typography key={i} variant="caption">
                                      {pesan}
                                    </Typography>
                                  );
                                })}
                            </div>

                            <div className={classes.fieldIndexHarga}>
                              {String(message.total_harga)
                                .split("\n")
                                .map((pesan, i) => {
                                  return (
                                    <NumberFormat
                                      key={i}
                                      value={pesan}
                                      displayType={"text"}
                                      prefix="Rp "
                                      thousandSeparator={true}
                                    />
                                  );
                                })}
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
      </>

      <div>
        <AppBar position="fixed" color="secondary" className={classes.appbar}>
          <Toolbar className={classes.tbContent1}>
            <div className={classes.div}>
              <Fab color="primary" className={classes.fab}>
                <img src={Cash} alt="icCash" />
              </Fab>
              <Typography variant="caption">Arus Kas</Typography>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              light={true}
              variant="middle"
            />
            <div className={classes.div}>
              <Fab color="primary" className={classes.fab}>
                <img src={Box} alt="icbox" />
              </Fab>
              <Typography variant="caption">Stok Barang</Typography>
            </div>

            <Divider
              orientation="vertical"
              flexItem
              light={true}
              variant="middle"
            />
            <div className={classes.div}>
              <Fab color="primary" className={classes.fab}>
                <img src={Biaya} alt="icBiaya" />
              </Fab>
              <Typography variant="caption">Biaya</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default ViewRoomOwner;
