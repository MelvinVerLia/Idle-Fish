import React from "react";
import { useState, createContext } from "react";

export const FactoryContext = createContext();

export const FactoryContextProvider = (props) => {
  const [Factory, setFactory] = useState([]);
  const [shopFactory, setShopFactory] = useState([]);

  return (
    <FactoryContext.Provider
      value={{ Factory, setFactory, shopFactory, setShopFactory }}
    >
      {props.children}
    </FactoryContext.Provider>
  );
};
