const app = require("./app");
const connectDB = require("./config/db");
const fetchCryptoData = require("./jobs/fetchCryptoData");
const cron = require("node-cron");

require("dotenv").config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    // Start background job to fetch crypto data every 2 hours
    cron.schedule("0 */2 * * *", fetchCryptoData);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
};

startServer();
