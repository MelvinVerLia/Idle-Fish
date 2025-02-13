import React, { useContext, useEffect, useState } from "react";
import { FactoryContext } from "../context/FactoryContext";
import ShopFinder from "../../API/ShopFinder";
import InventoryFinder from "../../API/InventoryFinder";
import { UsersContext } from "../context/UsersContext";

const FactoryShop = () => {
  const { shopFactory, setShopFactory } = useContext(FactoryContext);
  const { wallet, setWallet, userId, setUserId } = useContext(UsersContext);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchFactory = async () => {
      try {
        const response = await ShopFinder("shop/factory");
        setShopFactory(response.data.factory);
      } catch (error) {
        console.error("Error fetching factory data:", error);
      }
    };

    fetchFactory();
  }, [setShopFactory]);

  const buyFactory = async (factory_id, factory_name) => {
    try {
      const response = await ShopFinder(`shop/factory/buy/${factory_id}`, {
        params: { userId },
      });

      if (response.data.status === "success") {
        setStatus({
          message: `${factory_name} Factory bought successfully`,
          type: "success",
        });
      }
      setTimeout(() => setStatus(null), 3000);

      const walletResponse = await InventoryFinder("wallet", {
        params: { userId },
      });
      setWallet(walletResponse.data.data.wallet.wallet);
    } catch (error) {
      setStatus({
        message: error.response.data.error || "Failed to buy the factory",
        type: "error",
      });
      setTimeout(() => setStatus(null), 3000);
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      {status && (
        <div
          className={`absolute top-40 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow-md transition-opacity duration-500 ${
            status.type === "success"
              ? "bg-green-200 text-green-900"
              : "bg-red-200 text-red-900"
          }`}
        >
          {status.message}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">Factory Shop</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">
              Production Rate
            </th>
            <th className="border border-gray-300 px-4 py-2">Buy</th>
          </tr>
        </thead>
        <tbody>
          {shopFactory.map((f) => (
            <tr key={f.id} className="text-center even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{f.name}</td>
              <td className="border border-gray-300 px-4 py-2">{f.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {f.production_rate}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  onClick={() => buyFactory(f.id, f.name)}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactoryShop;
