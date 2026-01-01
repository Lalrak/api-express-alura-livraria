import express from "express";
import AutorController from "../controller/autores.controller.js";

const routes = express.Router();

routes.get("/autores", AutorController.listar);
routes.get("/autores/:id", AutorController.listarPorId);
routes.post("/autores", AutorController.criar);
routes.put("/autores/:id", AutorController.atualizar);
routes.delete("/autores/:id", AutorController.remover);

export default routes;
