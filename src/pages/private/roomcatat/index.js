import {
  AppBar,
  Avatar,
  Divider,
  Fab,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import AppHeader from "../../../components/AppBar";
import useStyles from "./styles";
import { useData } from "../../../components/DataProvider";

import icaccounting from "../../../image/budget.png";
import { Redirect } from "react-router-dom";

import IconSales from "../../../image/iconSales.png";
import IconBiaya from "../../../image/iconbiaya.png";
import { ShoppingCart } from "@material-ui/icons";
import Transaksi from "./transaksi";
import { groupBy } from "lodash";
import { isoToRelative, unixToIsoDate } from "../../../utils/datetime";
import { animateScroll as scroll } from "react-scroll";
import NumberFormat from "react-number-format";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../components/FirebaseProvider";

const RoomCatat = () => {
  const classes = useStyles();
  const { profile, transaksi } = useData();

  const transaksiId = transaksi
    .filter((trans) => (trans.id_catat = profile.id))
    .map((map) => map.id);

  const messageColRef = firestore
    .doc(`transaksi/${transaksiId}`)
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

  const [transaksiDialog, setTransaksiDialog] = useState({
    open: false,
    fieldMode: "Penjualan",
  });

  if (profile.type === "owner") {
    return (
      <div>
        <Redirect to="/submitmasuk" />
      </div>
    );
  }

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
            <div className={classes.content}>
              <Avatar className={classes.avatar}>
                <img src={icaccounting} alt="icon akuntansi" />
              </Avatar>
              <div className={classes.nama}>
                <Typography variant="subtitle2">{profile.nama}</Typography>
                <Typography variant="subtitle2">
                  {profile.nama_perusahaan}
                </Typography>
                <Typography variant="subtitle2">{profile.cabang}</Typography>
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
              <Fab
                color="primary"
                className={classes.fab}
                onClick={() => {
                  setTransaksiDialog({ open: true, fieldMode: "Penjualan" });
                }}
              >
                <img src={IconSales} alt="icPenjualan" />
              </Fab>
              <Typography variant="caption">Penjualan</Typography>
            </div>
            <Divider
              orientation="vertical"
              flexItem
              light={true}
              variant="middle"
            />
            <div className={classes.div}>
              <Fab
                color="primary"
                className={classes.fab}
                onClick={() => {
                  setTransaksiDialog({ open: true, fieldMode: "Pembelian" });
                }}
              >
                <ShoppingCart />
              </Fab>
              <Typography variant="caption">Pembelian</Typography>
            </div>

            <Divider
              orientation="vertical"
              flexItem
              light={true}
              variant="middle"
            />
            <div className={classes.div}>
              <Fab
                color="primary"
                className={classes.fab}
                onClick={() => {
                  setTransaksiDialog({ open: true, fieldMode: "Biaya" });
                }}
              >
                <img src={IconBiaya} alt="icBiaya" />
              </Fab>
              <Typography variant="caption">Biaya</Typography>
            </div>
          </Toolbar>
        </AppBar>

        <Transaksi
          {...transaksiDialog}
          handleClose={() => {
            setTransaksiDialog({ open: false });
          }}
        />
      </div>
    </>
  );
};

export default RoomCatat;
