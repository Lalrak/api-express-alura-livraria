import express from "express";
import livros from "./livros.routes.js";
import autores from "./autores.routes.js";
const routes = (app) => {
  app.route("/").get((req, res) => res.status(200).sed({ status: "ok" }));

  app.use(express.json(), livros, autores);
};

export default routes;
