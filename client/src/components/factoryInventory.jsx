import React, { useContext, useEffect } from "react";
import { FactoryContext } from "../context/FactoryContext";
import InventoryFinder from "../../API/InventoryFinder";
import { UsersContext } from "../context/UsersContext";

const FactoryInventory = () => {
  const { Factory, setFactory } = useContext(FactoryContext);
  const { userId } = useContext(UsersContext);

  // useEffect(() => {
  //   if (!userId) return;
  //   fetchFactory();
  // }, [setFactory]);

  useEffect(() => {
    if(!userId) return;
    fetchFactory();
  }, [userId, setFactory]);


  const fetchFactory = async () => {
    try {
      const response = await InventoryFinder("idle/factory", {
        params: { userId },
      });
      setFactory(response.data.factory);
      console.log(response.data.factory);
    } catch (error) {
      console.error("Error fetching factory data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Factory Shop</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">
              Production Rate
            </th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Factory.map((f) => (
            <tr
              key={`${f.user_id}-${f.factory_id}`}
              className="text-center even:bg-gray-100"
            >
              <td className="border border-gray-300 px-4 py-2">{f.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {f.production_rate}
              </td>
              <td className="border border-gray-300 px-4 py-2">{f.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FactoryInventory;
