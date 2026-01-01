import { autor } from "../models/autor.model.js";

class AutorController {
  constructor(parameters) {}

  static async listar(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao listar autor` });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const result = await autor.findById(id);
      res.status(200).json(result);
    } catch (error) {
      res
        .status(404)
        .json({ message: `${error.message} - autor nao encontrado` });
    }
  }

  static async criar(req, res) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json(novoAutor);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao crair autor` });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao crair autor` });
    }
  }

  static async remover(req, res) {
    try {
      const { id } = req.params;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluido" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao deletar autor` });
    }
  }
}

export default AutorController;
