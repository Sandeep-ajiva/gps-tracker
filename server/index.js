const express = require("express");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// file import
const modulesPath = path.join(__dirname, "Modules");
const responseTimeLogger = require("./middleware/responseTimeLogger");

// database connection
const connectDB = require("./config/database");
connectDB();

// create server
const app = express();

// cors
// const coreOptions = {
//   orgin: ["http://localhost:3000", "http://localhost:5000"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//   allowedHeaders: "Content-Type, Authorization",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseTimeLogger);
// app.use(cors(coreOptions));
// app.use("/uploads", express.static(UPLOAD_ROOT));

// Explicit auth alias to user routes so frontend /api/auth/* continues to work

// app.use("/api/auth", userRoutes);
app.get("/", (req, res) => {
  console.log("API is running...");
  res.send("API is running...");
});

// All routes 
fs.readdirSync(modulesPath).forEach((folder)=>{
    const routePath = path.join(modulesPath, folder, "routes.js");

    // check if the route file exists
    if(fs.existsSync(routePath)){
        const route = require(routePath);

        // mount route at /api/<folder-name>
        app.use(`/api/${folder.toLowerCase()}`, route);
        console.log(`Loaded routes for : /api/${folder.toLowerCase()}`);
    } else{
      console.warn(`No noutes.js found in : ${folder}`);
    }
});


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));