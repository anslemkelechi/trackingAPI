const dotenv = require("dotenv");

//Load environment variables FIRST
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

//Uncaught Exception handler
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 🔥 Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

//Connect To Server first — keep it alive regardless of DB state
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

//BUILD DB CONNECTION STRING
let DB = process.env.DATABASE_PROD.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

if (process.env.NODE_ENV === "development") {
  DB = process.env.DATABASE_LOCAL;
}

mongoose.set("strictQuery", true);

//Retry DB connection with backoff
const connectDB = () => {
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      family: 4, // Force IPv4 — fixes querySrv ENOTFOUND on Railway
    })
    .then(() => {
      console.log("DB Connection Successful");
    })
    .catch((err) => {
      console.log("Database Connection Error:", err.message);
      console.log("Retrying DB connection in 5 seconds...");
      setTimeout(connectDB, 5000);
    });
};

connectDB();

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 🔥 Shutting Down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
