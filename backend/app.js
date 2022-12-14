const express = require("express");
const app = express();
const authRoutes = require("./routes/auth"); // chamar a rota
const protectedRoutes = require("./routes/protected");
const db = require("./models");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));

const PORT = 3000;

// esperar que o servidor mysql esteja operacional
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
delay(2500).then(() =>
  db.sequelize.sync().then((req) => {
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  })
);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use(authRoutes);

app.use(protectedRoutes);
