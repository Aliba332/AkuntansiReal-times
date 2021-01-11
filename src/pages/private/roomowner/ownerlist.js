import {
  Avatar,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import React from "react";
import AppHeader from "../../../components/AppBar";
import useStyles from "./styles";
import { useData } from "../../../components/DataProvider";

import owners from "../../../image/owners.png";
import {
  FieldValue,
  firestore,
  useFirebase,
} from "../../../components/FirebaseProvider";
import { useHistory } from "react-router-dom";

const ListOwner = () => {
  const classes = useStyles();
  const { user } = useFirebase();

  const history = useHistory();

  const { profile, contacts, transaksi } = useData();

  const namaperusahaan = profile.nama_perusahaan.replace(/\s/g, "");

  const filterKontak = contacts
    .filter((kontak) => kontak.email_pemilik === profile.email)
    .sort((a, b) => {
      var x = a.nama.toLowerCase();
      var y = b.nama.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

  const Kapital = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  const handleOpenTransaksiRoom = (kontak) => async () => {
    const findTransaksi = transaksi.find((trans) => {
      return trans.user_ids.includes(kontak.id);
    });

    if (findTransaksi) {
      return history.push(`/view/${namaperusahaan}/${findTransaksi.id}`);
    }
    const newTransaksiData = {
      user_ids: [user.uid, kontak.id],
      last_message: {},
      unread_count: {
        [user.uid]: 0,
        [kontak.id]: 0,
      },
      user_profiles: {
        [user.uid]: profile,
        [kontak.id]: kontak,
      },
      status_aktif: true,
      id_catat: kontak.id,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    };

    try {
      const newTransaksiRef = await firestore
        .collection("transaksi")
        .add(newTransaksiData);

      history.push(`/view/${namaperusahaan}/${newTransaksiRef.id}`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <AppHeader
        toolbarContent={
          <>
            <div className={classes.content}>
              <Avatar className={classes.avatar}>
                <img src={owners} alt="owner" />
              </Avatar>

              <div className={classes.profil}>
                <Typography>{profile.nama}</Typography>
                <Typography>{profile.nama_perusahaan}</Typography>
              </div>
            </div>
          </>
        }
      />
      <Container maxWidth="md">
        <List>
          {filterKontak.map((kontak) => {
            if (kontak.id === user.uid) {
              return null;
            }
            return (
              <React.Fragment key={kontak.id}>
                <div className={classes.list}>
                  <div>
                    <ListItem button onClick={handleOpenTransaksiRoom(kontak)}>
                      <ListItemAvatar>
                        <Avatar alt={kontak.nama} src={kontak.foto} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={Kapital(kontak.nama)}
                        secondary={Kapital(kontak.cabang)}
                      />
                    </ListItem>
                  </div>

                  <div className={classes.typog}>
                    {transaksi.map((trans) => {
                      if (!trans.id_catat.includes(kontak.id)) {
                        return null;
                      }
                      return (
                        <Typography
                          key={trans.id}
                          variant="caption"
                          align="center"
                          color={
                            trans.status_aktif === true ? "primary" : "inherit"
                          }
                        >
                          {trans.id_catat === kontak.id
                            ? trans.status_aktif === true
                              ? "aktif"
                              : "non aktif"
                            : "belum diberi ijin"}
                        </Typography>
                      );
                    })}
                  </div>
                </div>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>
      </Container>
    </div>
  );
};

export default ListOwner;
