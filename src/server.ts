import express from "express";
import devotionalRoutes from "./routes/devotionalRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Devotionals API is running");
});

app.use("/api/devotionals", devotionalRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
