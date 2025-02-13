require("dotenv").config();

const cors = require("cors");
const express = require("express");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json()); // Enables parsing of JSON request bodies

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

setInterval(async () => {
  await updateWallets();
}, 5000);

async function updateWallets() {
  try {
    const inventoryCount = await db.query(`
      SELECT COUNT(*) AS count 
      FROM factory_inventory
    `);

    // If there are no records, don't proceed with the update
    if (inventoryCount.rows[0].count === 0) {
      console.log("No records in factory_inventory. Skipping wallet update.");
      return; // Exit the function early
    }

    await db.query(`
      UPDATE users 
      SET wallet = wallet + earnings
      FROM (
        SELECT user_id, SUM(production_rate * quantity) AS earnings
        FROM factory_inventory
        JOIN factory ON factory_inventory.factory_id = factory.id
        GROUP BY user_id
      ) AS earnings_table
      WHERE users.id = earnings_table.user_id;
    `);
    const updatedWallets = await db.query("SELECT id, wallet FROM users");

    console.log("Wallets updated successfully.");
  } catch (error) {
    console.error("Error updating wallets:", error);
  }
}
