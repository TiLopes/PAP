import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { usePasswordValidation } from "../helper/passwordVerify";

function SignupCondominio() {
  let navigate = useNavigate();

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
            <input type="password" name="password" onChange={setPass} />
            <div className="w-full mb-2">
              <ul>
                <li>
                  {validLength ? (
                    <i class="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i class="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Valid Length:{" "}
                </li>
                <li>
                  {hasNumber ? (
                    <i class="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i class="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Has a Number:{" "}
                </li>
                <li>
                  {upperCase ? (
                    <i class="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i class="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  UpperCase:{" "}
                </li>
                <li>
                  {lowerCase ? (
                    <i class="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i class="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  LowerCase:{" "}
                </li>
                <li>
                  {specialChar ? (
                    <i class="fa-solid fa-circle-check mr-3 text-green-500"></i>
                  ) : (
                    <i class="fa-solid fa-circle-xmark mr-3 text-red-500"></i>
                  )}
                  Special Character:{" "}
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
