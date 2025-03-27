const express = require("express");
const path = require("path");
const routes = require("./routes");
const db = require("./config/connection");
const progressRoutes = require("./routes/progress.routes");

// ❌ Typo in the import? Ensure the filename matches exactly
 // ✅ Corrected

const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Corrected CORS usage
app.use(cors({ origin: "*" }));

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  // app.use(express.static(path.join(__dirname, "../client/build")));
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// ✅ Added error handling for database connection
db.on("error", (err) => {
  console.error("Database connection error:", err);
});

db.once("open", () => {
  console.log("Database connected successfully.");
});

// ✅ Moved app.listen() outside db.once() to ensure the server starts
app.use(routes);
// app.use("/api/progress", progressRoutes);


app.get("/test", (req, res) => {
  console.log("Test API hit");
  res.json({ "hiii": "123" });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
