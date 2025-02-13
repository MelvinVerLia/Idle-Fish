import React, { createContext, useEffect, useState } from "react";
import InventoryFinder from "../../API/InventoryFinder";

export const UsersContext = createContext();

export const UsersContextProvider = (props) => {
  const [userId, setUserId] = useState(null);
  const [wallet, setWallet] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }
  }, []);

  const fetchWallet = async () => {
    if (!userId) return;

    try {
      const response = await InventoryFinder.get("wallet", {
        params: { userId },
      });
      setWallet(response.data.data.wallet.wallet);
      console.log("Wallet updated:", response.data.data.wallet.wallet);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  useEffect(() => {
    if (userId === null) return;

    fetchWallet(); // Fetch once immediately
    const interval = setInterval(fetchWallet, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [userId]);

  return (
    <UsersContext.Provider value={{ userId, setUserId, wallet, setWallet }}>
      {props.children}
    </UsersContext.Provider>
  );
};
