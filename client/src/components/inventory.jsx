import React, { useContext, useEffect, useState } from "react";
import { FishContext } from "../context/FishContext";
import InventoryFinder from "../../API/InventoryFinder";
import { UsersContext } from "../context/UsersContext";

const Inventory = () => {
  const { Inventorys, setInventorys } = useContext(FishContext);
  const { userId, setUserId, wallet, setWallet } = useContext(UsersContext);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const response = await InventoryFinder.get("/inventory", {
          params: { userId },
        });

        setInventorys(response.data.data.inventories);
        // console.log(response.data.data.inventories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId, setInventorys]);

  const sellOne = async (fish_id, fish_name) => {
    if (!userId) return;
    try {
      const response = await InventoryFinder(`sell/${fish_id}`, {
        params: { userId },
      });

      if (response.data.status === "success") {
        setStatus({
          message: `${fish_name} Fish sold successfully`,
          type: "success",
        });
      }
      setTimeout(() => setStatus(null), 3000);

      const inventoryResponse = await InventoryFinder("inventory", {
        params: { userId },
      });
      setInventorys(inventoryResponse.data.data.inventories);

      const walletResponse = await InventoryFinder("wallet", {
        params: { userId },
      });
      setWallet(walletResponse.data.data.wallet.wallet);
    } catch (error) {
      console.log(error);
    }
  };

  const sellAll = async (fish_id, fish_name) => {
    if (!userId) return;
    try {
      const response = await InventoryFinder(`sellall/${fish_id}`, {
        params: { userId },
      });

      if (response.data.status === "success") {
        setStatus({
          message: `${fish_name} Fish sold successfully`,
          type: "success",
        });
      }
      setTimeout(() => setStatus(null), 3000);

      const inventoryResponse = await InventoryFinder("inventory", {
        params: { userId },
      });
      setInventorys(inventoryResponse.data.data.inventories);

      const walletResponse = await InventoryFinder("wallet", {
        params: { userId },
      });
      setWallet(walletResponse.data.data.wallet.wallet);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mt-5">
      {status && (
        <div
          className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md transition-opacity duration-500 ${
            (status.type === "success", "bg-green-200 text-green-800")
          }`}
        >
          {status.message}
        </div>
      )}
      <table className="table-fixed border-collapse border border-gray-400 w-1/2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Fish</th>
            <th className="border border-gray-400 px-4 py-2">Quantity</th>
            <th className="border border-gray-400 px-4 py-2">Price</th>
            <th className="border border-gray-400 px-4 py-2">Rarity</th>
            <th className="border border-gray-400 px-4 py-2">Sell One</th>
            <th className="border border-gray-400 px-4 py-2">Sell All</th>
          </tr>
        </thead>
        <tbody>
          {Inventorys &&
            Inventorys.map((i) => {
              return (
                <tr key={`${i.user_id}-${i.fish_id}`}>
                  <td className="border border-gray-400 px-4 py-2">{i.name}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    {i.quantity}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {i.price}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {i.rarity}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      onClick={() => sellOne(i.fish_id, i.name)}
                    >
                      Sell
                    </button>
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => sellAll(i.fish_id, i.name)}
                    >
                      Sell All
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
