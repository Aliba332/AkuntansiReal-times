import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useData } from "../../../components/DataProvider";
import ListOwner from "./ownerlist";
import ViewRoomOwner from "./viewroom";

const RoomOwner = () => {
  const { profile } = useData();
  if (profile.type === "pencatat") {
    return <Redirect to="./submitmasuk" />;
  }
  const namaperusahaan = profile.nama_perusahaan.replace(/\s/g, "");
  return (
    <Switch>
      <Route
        path={`/viewroom/${namaperusahaan}/:idtransaksi`}
        component={ViewRoomOwner}
      />
      <Route component={ListOwner} />
    </Switch>
  );
};

export default RoomOwner;
