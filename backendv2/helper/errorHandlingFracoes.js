const fracoesErrors = (err) => {
  let tipo;
  let error = { fracao: "", andar: "" };

  if (err.hasOwnProperty("parent")) {
    tipo = err.parent.code;
  } else {
    tipo = err.message;
  }

  if (tipo === "ER_DUP_ENTRY") {
    error.fracao = "Fração já existe.";
    return error;
  }

  return error;
};

module.exports = { fracoesErrors };
