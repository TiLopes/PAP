import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { usePasswordValidation } from "../helper/passwordVerify";

function SignupCondominio() {
  let navigate = useNavigate();

  const [hide, setHide] = useState(false);

  const hidePass = (ev) => {
    setHide(!hide);
  };

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const [password, setPassword] = useState({
    password: "",
  });

  const [validLength, hasNumber, upperCase, lowerCase, specialChar] =
    usePasswordValidation({
      password: password.password,
    });

  const setPass = (ev) => {
    setPassword({ ...password, password: ev.target.value });
  };

  return (
    <>
      <div className="signup min-w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Registro de condomínio</h1>

        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            nome: "",
            nif: "",
            nomeAdmin: "",
            email: "",
            password: "",
            morada: "",
            codPostal: "",
          }}
          validationSchema={Yup.object({
            nome: Yup.string().required(
              "Obrigatório preencher o nome do condomínio."
            ),
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
          })}
          onSubmit={async (values) => {
            try {
              const res = await axios.post(
                "http://localhost:3000/api/auth/signup",
                {
                  nomeCond: values.nome,
                  nomeAdmin: values.nomeAdmin,
                  email: values.email,
                  password: values.password,
                  nif: values.nif,
                  morada: values.morada,
                  codPostal: values.codPostal,
                  userType: "condominio",
                }
              );
              console.log({ res });
              Redirect();
            } catch (error) {
              console.log({ error });
            }
          }}
        >
          <Form>
            <div className="w-4/6 mb-4">
              <label htmlFor="nome">Nome do condomínio</label>
              <Field type="text" name="nome"></Field>
            </div>
            <div className="w-1/4">
              <label htmlFor="nif">NIF</label>
              <Field
                type="text"
                name="nif"
                maxLength={9}
                size={9}
                placeholder="123456789"
              ></Field>
            </div>
            <label htmlFor="nomeAdmin">Nome do administrador</label>
            <Field type="text" name="nomeAdmin" />
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <label htmlFor="password">Password</label>
            <div className="relative w-full password">
              <input
                type={hide ? "text" : "password"}
                name="password"
                onChange={setPass}
              />
              {hide ? (
                <svg
                  className="absolute w-6 -translate-x-1/2 -translate-y-1/2 right-0 text-2xl top-1/2 cursor-pointer"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={hidePass}
                >
                  <path
                    d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z"
                    fillRule="nonzero"
                  />
                </svg>
              ) : (
                <svg
                  className="absolute w-6 -translate-x-1/2 -translate-y-1/2 right-0 text-2xl top-1/2 cursor-pointer"
                  clipRule="evenodd"
                  fillRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={hidePass}
                >
                  <path
                    d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
                    fillRule="nonzero"
                  />
                </svg>
              )}
            </div>
            <div className="w-full mb-2">
              <ul>
                <li>
                  {validLength ? (
                    <i className="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Mínimo de 8 caracteres
                </li>
                <li>
                  {hasNumber ? (
                    <i className="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Tem um digito
                </li>
                <li>
                  {upperCase ? (
                    <i className="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Tem uma maiúscula
                </li>
                <li>
                  {lowerCase ? (
                    <i className="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Tem uma minúscula
                </li>
                <li>
                  {specialChar ? (
                    <i className="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Tem 1 caractere especial
                </li>
              </ul>
            </div>
            <div className="w-4/6 mb-4">
              <label htmlFor="morada">Morada</label>
              <Field type="text" name="morada" placeholder="Rua da Água, 2" />
            </div>
            <div className="w-1/4">
              <label htmlFor="codPostal">Cód. Postal</label>
              <Field
                type="text"
                name="codPostal"
                maxLength={8}
                size={8}
                placeholder="1234-123"
              />
            </div>
            <ErrorMessage
              name="nome"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="nif"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="nomeAdmin"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="morada"
              component="div"
              className="w-full text-center error-message"
            />
            <ErrorMessage
              name="codPostal"
              component="div"
              className="w-full text-center error-message"
            />
            <button type="submit" className={"mx-auto font-bold"}>
              Registrar
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default SignupCondominio;
