const express = require("express");
const app = express();
const authRoutes = require("./routes/auth"); // chamar a rota
const protectedRoutes = require("./routes/protected");
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const PORT = 3000;

// esperar que o servidor mysql esteja operacional
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// delay(2500).then(() =>
// );

db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
});

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(authRoutes);

app.use(protectedRoutes);
