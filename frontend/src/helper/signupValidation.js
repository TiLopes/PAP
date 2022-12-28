import * as Yup from "yup";

export const signupCondominoValidation = Yup.object({
  nome: Yup.string().required("Obrigatório preencher."),
  nif: Yup.string()
    .required("Obrigatório preencher.")
    .matches(/^\d\d\d\d\d\d\d\d\d$/, "NIF inválido!"),
  telemovel: Yup.string()
    .required("Obrigatório preencher.")
    .matches(/^\d\d\d\d\d\d\d\d\d$/, "Nº telemóvel inválido!"),
  email: Yup.string()
    .required("Obrigatório preencher.")
    .email("Email inválido!"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$/,
    "erro"
  ),
  andar: Yup.string().required("Obrigatório preencher."),
  fracao: Yup.string().required("Obrigatório preencher."),
});

export const signupCondominioValidation = Yup.object({
  nome: Yup.string().required("Obrigatório preencher o nome do condomínio."),
  nif: Yup.string()
    .matches(/^\d\d\d\d\d\d\d\d\d$/, "NIF inválido!")
    .required("Obrigatório preencher o NIF."),
  nomeAdmin: Yup.string().required(
    "Obrigatório preencher o nome do administrador do condomínio."
  ),
  email: Yup.string()
    .email("Email inválido!")
    .required("Obrigatório preencher o email."),
  // password: Yup.string().min(6, "A password t").max(25).required(),
  morada: Yup.string().required("Obrigatório preencher a morada."),
  codPostal: Yup.string()
    .matches(/^\d\d\d\d-\d\d\d$/, "Código postal inválido")
    .required("Obrigatório preencher o código postal."),
});

export const loginCondominioValidation = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
