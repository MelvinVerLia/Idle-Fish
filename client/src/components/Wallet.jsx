import React, { useContext, useEffect, useState } from "react";
import InventoryFinder from "../../API/InventoryFinder";
import { UsersContext } from "../context/UsersContext";

const Wallet = () => {
  const { wallet, userId } = useContext(UsersContext);

  return (
    <div className="flex justify-center mt-5">
      <h1 className="text-5xl font-bold">
        Fisch: {wallet ?? "Loading..."}
      </h1>
    </div>
  );
};

export default Wallet;
