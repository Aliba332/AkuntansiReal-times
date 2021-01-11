import React, { useContext } from "react";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore, useFirebase } from "./FirebaseProvider";

import AppLoading from "./AppLoading";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export default function DataProvider(props) {
  const { user } = useFirebase();

  const contactsCol = firestore.collection("profiles");
  const transaksiCol = firestore.collection("transaksi");

  const [contacts, loadingContacts] = useCollectionData(contactsCol, {
    idField: "id",
  });

  const [transaksi, loadingTransaksi] = useCollectionData(
    transaksiCol
      .where("user_ids", "array-contains", user.uid)
      .orderBy("updated_at", "desc"),
    {
      idField: "id",
    }
  );
  
  const profile = contacts && contacts.find((item) => item.id === user.uid);

  if (loadingContacts || loadingTransaksi) {
    return <AppLoading />;
  }

  return (
    <DataContext.Provider
      value={{
        contacts,
        transaksi,
        profile,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
