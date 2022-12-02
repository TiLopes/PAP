import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import {
  redirect,
  Route,
  Navigate,
  Routes,
  useNavigate,
} from "react-router-dom";

function SignupCondominio() {
  let navigate = useNavigate();

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  return (
    <>
      <div className="signup min-w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Registro de condomínio</h1>

        {/* <form onSubmit={formSubmit}>
        <label htmlFor="nome">Nome do condomínio</label>
        <input type={"text"} name={"nome"} id={"nome"} />
        <label htmlFor="nome">Nome do administrador</label>
        <input type={"text"} name={"nomeAdmin"} id={"nomeAdmin"} />
        <label htmlFor="nome">Email</label>
        <input type={"email"} name="email" id={"email"} />
        <label htmlFor="nome">Password</label>
        <input type={"password"} name={"password"} id={"password"} />
        <div className="w-4/6">
          <label htmlFor="nome">Morada</label>
          <input type="text" name={"morada"} id={"morada"} />
        </div>
        <div className="w-1/4">
          <label htmlFor="nome">Cód. Postal</label>
          <input
            type={"text"}
            name={"codPostal"}
            id={"codPostal"}
            size={8}
            pattern="\d\d\d\d-\d\d\d"
          />
        </div>
        <input type={"submit"} value="Sign up" className={"bg-zinc-800"} />
      </form> */}
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
          validate={(values) => {
            const errors = {};

            if (values.nif === "") {
              errors.nif = "NIF é obrigatório preencher";
            }

            if (!values.nif.match(/^\d\d\d\d\d\d\d\d\d$/)) {
              errors.nif = "NIF inválido";
            }

            if (values.codPostal === "") {
              errors.codPostal = "Código postal é obrigatório preencher";
            }

            if (!values.codPostal.match(/^\d\d\d\d-\d\d\d$/)) {
              errors.codPostal = "Código postal inválido";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);

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
          {({ isSubmitting }) => (
            <Form>
              <div className="w-4/6 mb-4">
                <label htmlFor="nome">Nome do condomínio</label>
                <Field type="text" name="nome"></Field>
              </div>
              <div className="w-1/4">
                <label htmlFor="nif">NIF</label>
                <Field type="text" name="nif" maxLength={9} size={9}></Field>
              </div>
              <label htmlFor="nomeAdmin">Nome do administrador</label>
              <Field type="text" name="nomeAdmin"></Field>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <div className="w-4/6 mb-4">
                <label htmlFor="morada">Morada</label>
                <Field type="text" name="morada" />
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
                className="w-full text-center"
              />
              <ErrorMessage
                name="nif"
                component="div"
                className="w-full text-center"
              />
              <ErrorMessage
                name="nomeAdmin"
                component="div"
                className="w-full text-center"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="w-full text-center"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="w-full text-center"
              />
              <ErrorMessage
                name="morada"
                component="div"
                className="w-full text-center"
              />
              <ErrorMessage
                name="codPostal"
                component="div"
                className="w-full text-center"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={"mx-auto font-bold"}
              >
                Registrar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default SignupCondominio;
