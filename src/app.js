const express = require("express");
const statsRoutes = require("./routes/stats");
const deviationRoutes = require("./routes/deviation");

const app = express();

app.use(express.json());
app.use(statsRoutes);
app.use(deviationRoutes);

module.exports = app;
