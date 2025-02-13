require("dotenv").config();

const cors = require("cors");
const express = require("express");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json()); // Enables parsing of JSON request bodies

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const rarityMap = {
  Common: 50,
  Uncommon: 30,
  Rare: 15,
  Epic: 4,
  Legendary: 1,
};

app.post("/gacha", async (req, res) => {
  try {
    const userId = req.body.userId;

    // Check user level
    const userResult = await db.query(
      "SELECT level, last_gacha_time FROM users WHERE id = $1",
      [userId]
    );
    const user = userResult.rows[0];
    console.log(userResult.rows[0]);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    // Gacha cooldown check
    // const now = new Date();
    // if (user.last_gacha_time) {
    //   const diffInSeconds = (now - new Date(user.last_gacha_time)) / 1000;
    //   if (diffInSeconds < 10) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: `Please wait ${Math.ceil(
    //         10 - diffInSeconds
    //       )} seconds before rolling again.`,
    //     });
    //   }
    // }

    // Get eligible fish based on user level
    const fishResult = await db.query(
      "SELECT * FROM fish WHERE unlock_level <= $1",
      [user.level]
    );
    // fishResult.rows.forEach(f => console.log(f.name));
    
    const fishPool = fishResult.rows;
    if (fishPool.length === 0) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "No fish available for your level.",
        });
    }
    // fishPool.forEach(f => console.log(f.rarity));
    // Normalize fish chances
    const totalChance = fishPool.reduce((sum, fish) => sum + parseFloat(fish.pool_rate), 0);
    // console.log(totalChance);

    let cumulative = 0;
    const normalizedFish = fishPool.map((fish) => {
      const normalizedChance = parseFloat(fish.pool_rate) / totalChance;
      cumulative += normalizedChance;
      return { ...fish, normalizedChance, cumulative };
    });

    // console.log(normalizedFish);
    // console.log(cumulative);
    // Perform the gacha roll
    const roll = Math.random();
    console.log(roll);
    const selectedFish =
      normalizedFish.find((fish) => roll < fish.cumulative) ||
      normalizedFish[normalizedFish.length - 1];

    if (!selectedFish) {
      console.error(
        "No fish selected. Roll:",
        roll,
        "Normalized fish:",
        normalizedFish
      );
      return res.status(500).json({ error: "Failed to select a fish." });
    }
    // if (!selectedFish) {
    //   return res.status(500).json({
    //     status: "error",
    //     message: "Failed to select a fish. Please try again.",
    //   });
    // }

    // Add the fish to the user's inventory
    await db.query(
      `INSERT INTO inventory (user_id, fish_id, quantity) 
         VALUES ($1, $2, 1) 
         ON CONFLICT (user_id, fish_id) 
         DO UPDATE SET quantity = inventory.quantity + 1`,
      [userId, selectedFish.id]
    );

    // Update the last gacha time
    await db.query("UPDATE users SET last_gacha_time = NOW() WHERE id = $1", [
      userId,
    ]);

    res.status(200).json({
      status: "success",
      data: { fish: selectedFish },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
