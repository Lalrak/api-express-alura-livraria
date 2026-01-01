import { autor } from "../models/autor.model.js";
import livro from "../models/livros.model.js";

class LivroController {
  constructor(parameters) {}

  static async listar(req, res) {
    try {
      const listaLivros = await livro.find({}).populate("autor").exec();
      res.status(200).json(listaLivros);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao listar livro` });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const result = await livro.findById(id).populate("autor").exec();
      res.status(200).json(result);
    } catch (error) {
      res
        .status(404)
        .json({ message: `${error.message} - livro nao encontrado` });
    }
  }

  static async criar(req, res) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro,
        autor: { ...autorEncontrado._doc },
      };
      const result = await livro.create(livroCompleto);
      res.status(201).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao crair livro` });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "livro atualizado" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao crair livro` });
    }
  }

  static async remover(req, res) {
    try {
      const { id } = req.params;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "livro excluido" });
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha ao deletar livro` });
    }
  }

  static async listarLivrosPorEditora(req, res) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro
        .find({ editora: editora })
        .populate("autor")
        .exec();
      if (!livrosPorEditora)
        res.status(404).json({ message: "Nada Encontrado" });
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` });
    }
  }
}

export default LivroController;
