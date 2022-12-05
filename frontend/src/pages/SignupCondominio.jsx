import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

            if (!values.nome) {
              errors.nome = "Nome do condomínio é obrigatório preencher";
            }

            if (!values.nomeAdmin) {
              errors.nomeAdmin =
                "Nome do administrador é obrigatório preencher";
            }

            if (!values.email) {
              errors.email = "Email é obrigatório preencher";
            }

            if (!values.password) {
              errors.password = "Password é obrigatória preencher";
            }

            if (!values.morada) {
              errors.morada = "Morada é obrigatória preencher";
            }

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
                <Field
                  type="text"
                  name="nif"
                  maxLength={9}
                  size={9}
                  placeholder="123456789"
                ></Field>
              </div>
              <label htmlFor="nomeAdmin">Nome do administrador</label>
              <Field type="text" name="nomeAdmin"></Field>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
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
