import express from "express";
import LivroController from "../controller/livros.controller.js";

const routes = express.Router();

routes.get("/livros", LivroController.listar);
routes.get("/livros/busca", LivroController.listarLivrosPorEditora);
routes.get("/livros/:id", LivroController.listarPorId);
routes.post("/livros", LivroController.criar);
routes.put("/livros/:id", LivroController.atualizar);
routes.delete("/livros/:id", LivroController.remover);

export default routes;
