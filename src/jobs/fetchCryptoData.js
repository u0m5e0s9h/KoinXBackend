const axios = require("axios");
const Crypto = require("../models/Crypto");

const fetchCryptoData = async () => {
  const coins = ["bitcoin", "matic-network", "ethereum"];
  const url = "https://api.coingecko.com/api/v3/simple/price";
  const params = {
    ids: coins.join(","),
    vs_currencies: "usd",
    include_market_cap: "true",
    include_24hr_change: "true",
  };

  try {
    const response = await axios.get(url, { params });
    const data = response.data;

    for (const coin of coins) {
      const record = new Crypto({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change,
      });
      await record.save();
    }
    console.log("Crypto data fetched and saved");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};

module.exports = fetchCryptoData;
