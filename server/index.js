const express = require("express");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const responseTimeLogger = require("./middleware/responseTimeLogger");
const connectDB = require("./config/database");

connectDB();

const app = express();
const modulesPath = path.join(__dirname, "Modules");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTimeLogger);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// auto load all module routes
fs.readdirSync(modulesPath).forEach((folder) => {
  const routePath = path.join(modulesPath, folder, "routes.js");

  if (fs.existsSync(routePath)) {
    const route = require(routePath);

    // 🚨 SAFETY CHECK
    if (typeof route !== "function") {
      console.warn(`❌ Skipped ${folder} → routes.js does not export a router`);
      return;
    }

    app.use(`/api/${folder.toLowerCase()}`, route);
    console.log(`✅ Loaded routes for : /api/${folder.toLowerCase()}`);
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
