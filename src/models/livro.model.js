import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório."],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório(a)."],
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória."],
      enum: {
        values: ["Casa do código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido.",
      },
    },
    numeroPaginas: {
      type: Number,
<<<<<<< HEAD
      min: [10, "O número de páginas deve estar entre 10 e 5000"],
      max: [5000, "O número de páginas deve estar entre 10 e 5000"],
=======
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message:
          "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}.",
      },
>>>>>>> 3e17214 (feat: refatorar importações de modelos e adicionar validação global para campos de string)
    },
  },
  { versionKey: false }
);

const livros = mongoose.model("livros", livroSchema);

export default livros;
