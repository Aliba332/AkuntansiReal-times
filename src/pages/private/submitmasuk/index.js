import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useData } from "../../../components/DataProvider";

const SubmitMasuk = ({ component: Component, ...restProps }) => {
  const { profile, transaksi } = useData();
  const namaperusahaan = profile.nama_perusahaan.replace(/\s/g, "");

  const transaksiId = transaksi
    .filter((trans) => (trans.id_catat = profile.id))
    .map((map) => map.id);

  return (
    <Route
      {...restProps}
      render={() => {
        if (profile.type === "owner") {
          return <Redirect to={`/owner/${namaperusahaan}`} />;
        } else if (profile.type === "pencatat") {
          return transaksiId.length === 0 ? (
            <Redirect to="errorid" />
          ) : (
            <Redirect to={`/catat/${namaperusahaan}/${transaksiId}`} />
          );
        }
      }}
    />
  );
};

export default SubmitMasuk;
