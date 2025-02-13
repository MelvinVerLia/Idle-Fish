import React, { useEffect } from "react";
import { useState, createContext } from "react";
import InventoryFinder from "../../API/InventoryFinder";

export const FishContext = createContext();

export const FishContextProvider = (props) => {
  const [Inventorys, setInventorys] = useState([]);

  return (
    <FishContext.Provider
      value={{ Inventorys, setInventorys}}
    >
      {props.children}
    </FishContext.Provider>
  );
};
