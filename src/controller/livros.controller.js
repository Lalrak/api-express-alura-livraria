import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros, autores } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find().populate("autor");
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();

      if (!livroResultado)
        next(new NaoEncontrado("Id do livro não localizado."));

      res.status(200).send(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();
      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (!livroResultado)
        next(new NaoEncontrado("Id do livro não localizado."));

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);
      if (!livroResultado)
        next(new NaoEncontrado("Id do livro não localizado."));

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");

        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).json([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

const processaBusca = async (query) => {
  const { editora, titulo, nomeAutor, minPaginas, maxPaginas } = query;

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
  if (minPaginas || maxPaginas) {
    busca.numeroPaginas = {};
    if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
    if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;
  }
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (!autor) {
      busca = null;
    } else {
      busca.autor = autor._id;
    }
  }

  return busca;
};

export default LivroController;
