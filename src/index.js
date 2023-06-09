import express from "express";
import initRoutes from "./routes/router.js";
import initMiddlewares from "./middlewares/init.js";
import initDb from "./config/database.config.js";

const app = express();

const PORT = process.env.PORT || 1960; //va chercher port dans le fichier env.dev et si il ne le trouve pas utilise le port 5001

app.get("/", (req, res) => {
  res.send("ca marche ! ");
});
initDb();
initMiddlewares(app);
initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
