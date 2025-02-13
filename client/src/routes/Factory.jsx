import React from "react";
import Header from "../components/header";
import { FactoryContextProvider } from "../context/FactoryContext";
import FactoryInventory from "../components/factoryInventory";
import { FishContextProvider } from "../context/FishContext";
import Wallet from "../components/Wallet";
import { UsersContextProvider } from "../context/UsersContext";

const Factory = () => {
  return (
    <UsersContextProvider>
      <FishContextProvider>
        <FactoryContextProvider>
          <Header />
          <Wallet />
          <FactoryInventory />
        </FactoryContextProvider>
      </FishContextProvider>
    </UsersContextProvider>
  );
};

export default Factory;
