import React from "react";
import Wallet from "../components/Wallet";
import Header from "../components/header";
import GachaButton from "../components/gachaButton";
import Inventory from "../components/inventory";
import { FishContextProvider } from "../context/FishContext";
import { UsersContextProvider } from "../context/UsersContext";

const Gacha = () => {
  return (
    <div>
      <UsersContextProvider>
        <FishContextProvider>
          <Header />
          <Wallet />
          <GachaButton />
          <Inventory />
        </FishContextProvider>
      </UsersContextProvider>
    </div>
  );
};

export default Gacha;
