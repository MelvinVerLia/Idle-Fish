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

// get my fish inventory
app.get("/inventory", async (req, res) => {
  try {
    // console.log("masuk backend");
    const user_id = req.query.userId;
    const results = await db.query(
      "SELECT inventory.user_id, inventory.fish_id, fish.name, fish.rarity, inventory.quantity, fish.price FROM inventory JOIN fish ON inventory.fish_id = fish.id WHERE inventory.user_id = $1 ORDER BY pool_rate DESC;",
      [user_id]
    );
    res.status(200).json({
      status: "success",
      data: {
        inventories: results.rows,
      },
    });
    // await res.end();
    // console.log("keluar backend");
  } catch (error) {
    console.log(error.message);
  }
});

// get owned factory
app.get("/idle/factory", async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  try {
    const results = await db.query(
      `
        SELECT fi.user_id, f.id AS factory_id, f.name, f.price, f.production_rate, fi.quantity 
        FROM factory_inventory fi
        JOIN factory f ON fi.factory_id = f.id
        WHERE fi.user_id = $1;
      `,
      [userId]
    );
    // console.log(results.rows);
    res.status(200).json({
      status: "success",
      factory: results.rows,
    });
  } catch (error) {
    console.log(error);
  }
});

// mi money
app.get("/wallet", async (req, res) => {
  const user_id = req.query.userId;
  // console.log(user_id);
  try {
    const result = await db.query("SELECT wallet FROM users where id = $1", [
      user_id,
    ]);
    res.status(200).json({
      status: "success",
      data: {
        wallet: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// sell one fish
app.get("/sell/:id", async (req, res) => {
  const { id } = req.params; // fish_id from URL
  const user_id = req.query.userId;
  try {
    const result = await db.query(
      `
      WITH fish_price AS (
    SELECT price FROM fish WHERE id = $1
    ),
    delete_fish AS (
    DELETE FROM inventory 
    WHERE user_id = $2 AND fish_id = $1 AND quantity = 1
    RETURNING fish_id
    ),
    update_quantity AS (
    UPDATE inventory 
    SET quantity = quantity - 1 
    WHERE user_id = $2 AND fish_id = $1 AND quantity > 1
    RETURNING quantity
    ),
    update_wallet AS (
    UPDATE users 
    SET wallet = wallet + (SELECT price FROM fish_price)
    WHERE id = $2
    AND EXISTS (SELECT 1 FROM delete_fish UNION SELECT 1 FROM update_quantity)
    RETURNING wallet
      )
      SELECT wallet FROM update_wallet;
      `,
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fish not found or not owned" });
    }

    res.status(200).json({
      status: "success",
      data: {
        wallet: result.rows[0].wallet,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// sell all that fish iykyk
app.get("/sellall/:id", async (req, res) => {
  const { id } = req.params; // fish_id from URL
  const user_id = req.query.userId;
  try {
    const result = await db.query(
      `
      WITH fish_data AS (
        SELECT price, 
        (SELECT quantity FROM inventory WHERE user_id = $2 AND fish_id = $1) AS qty
        FROM fish 
        WHERE id = $1
      ),
      update_wallet AS (
        UPDATE users 
        SET wallet = wallet + (SELECT price * qty FROM fish_data)
        WHERE id = $2
        RETURNING wallet
      ),
      delete_fish AS (
        DELETE FROM inventory 
        WHERE user_id = $2 AND fish_id = $1
        RETURNING fish_id
      )
      SELECT wallet FROM update_wallet;
      `,
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fish not found or not owned" });
    }

    res.status(200).json({
      status: "success",
      data: {
        wallet: result.rows[0].wallet,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
