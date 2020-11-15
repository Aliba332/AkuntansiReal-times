import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Typography, IconButton, Grid } from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CreateIcon from "@material-ui/icons/Create";
import InfoIcon from "@material-ui/icons/Info";

import { useData } from "../../../components/DataProvider";
import { useFirebase } from "../../../components/FirebaseProvider";

import AppHeader from "../../../components/AppBar";

import UploadAvatar from "./avatar";
import EditDialog from "./edit";

import useStyles from "./styles/index";

export default function Pengaturan() {
  const classes = useStyles();
  const history = useHistory();
  const { profile } = useData();
  const { user } = useFirebase();
  const [editDialog, setEditDialog] = useState({
    open: false,
    fieldMode: "Nama"
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
            <Typography variant="h6">Pengaturan</Typography>
          </>
        }
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UploadAvatar />
        </Grid>

        <Grid item xs={12}>
          <List className={classes.List}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <PersonIcon />
              </ListItemAvatar>
              <ListItemText primary="Nama" secondary={profile.nama} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditDialog({
                      open: true,
                      fieldMode: "Nama"
                    });
                  }}
                  edge="end"
                  aria-label="edit"
                  color="primary"
                >
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <InfoIcon />
              </ListItemAvatar>
              <ListItemText
                primary="Deskripsi"
                secondary={profile.deskripsi || "Belum ada Deskripsi"}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditDialog({
                      open: true,
                      fieldMode: "Deskripsi"
                    });
                  }}
                  edge="end"
                  aria-label="edit"
                  color="primary"
                >
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <EmailIcon />
              </ListItemAvatar>
              <ListItemText primary="email" secondary={user.email} />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditDialog({
                      open: true,
                      fieldMode: "Email"
                    });
                  }}
                  edge="end"
                  aria-label="edit"
                  color="primary"
                >
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <VpnKeyIcon />
              </ListItemAvatar>
              <ListItemText primary="Password" secondary="*******" />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setEditDialog({
                      open: true,
                      fieldMode: "Password"
                    });
                  }}
                  edge="end"
                  aria-label="edit"
                  color="primary"
                >
                  <CreateIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      </Grid>
      <EditDialog
        {...editDialog}
        handleClose={() => {
          setEditDialog((editDialog) => ({ ...editDialog, open: false }));
        }}
      />
    </>
  );
}
