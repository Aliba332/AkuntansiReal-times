import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegistrasiOwner from "./pages/daftarowner";
import LupaPassword from "./pages/lupa-password";
import Landing from "./pages/landing";
import NotFound from "./pages/404";
// import Chat from "./pages/private/chat";
import Pengaturan from "./pages/private/pengaturan";
import PrivateRoute from "./components/PrivateRoute";
import FirebaseProvider from "./components/FirebaseProvider";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./config/theme";
import { SnackbarProvider } from "notistack";
import CssBaseline from "@material-ui/core/CssBaseline";
import RegistrasiPencatat from "./pages/daftarpencatat";
import RoomCatat from "./pages/private/roomcatat";

import RoomOwner from "./pages/private/roomowner";
import Login from "./pages/login";
import SubmitMasuk from "./pages/private/submitmasuk";

import ViewRoomOwner from "./pages/private/roomowner/viewroom";
import Signouts from "./pages/private/submitmasuk/signouts";


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2}>
        <CssBaseline />
        <FirebaseProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/daftarowner" component={RegistrasiOwner} />
              <Route path="/daftarpencatat" component={RegistrasiPencatat} />
              <Route path="/login" component={Login} />
              <Route path="/lupa-password" component={LupaPassword} />

              <PrivateRoute path="/pengaturan" component={Pengaturan} />
              <PrivateRoute path="/submitmasuk" component={SubmitMasuk} />
              <PrivateRoute path="/errorid" component={Signouts}/>
              <PrivateRoute path="/catat" component={RoomCatat}>
                
              </PrivateRoute>
              <PrivateRoute path="/owner" component={RoomOwner} />
            
              <PrivateRoute
                path="/view/:namaperusahaan/:transaksiId"
                component={ViewRoomOwner}
              />

              <Route component={NotFound} />
            </Switch>
          </Router>
        </FirebaseProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
