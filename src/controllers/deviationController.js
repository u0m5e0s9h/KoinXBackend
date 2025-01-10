const Crypto = require("../models/Crypto");
const { calculateStandardDeviation } = require("../utils/calculateSD");

const getDeviation = async (req, res) => {
  const { coin } = req.query;

  if (!coin) {
    return res.status(400).json({ error: "Missing coin query parameter" });
  }

  try {
    const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: "No data found for the specified coin" });
    }

    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    res.json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDeviation };
