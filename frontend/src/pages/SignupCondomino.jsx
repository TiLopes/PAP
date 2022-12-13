import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function SignupCondomino() {
  let navigate = useNavigate();
  let { condominioCode } = useParams();
  let condominioId;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/auth/signup/${condominioCode}`
        );
        console.log(res);
        condominioId = res.data.id;
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function Redirect() {
    let path = `/login/condomino`;
    navigate(path);
  }

  return (
    <>
      <div className="signup min-w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Registro de condomino</h1>

        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            nome: "",
            nif: "",
            telemovel: "",
            email: "",
            password: "",
            morada: "",
            codPostal: "",
            andar: "",
            fracao: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.nome) {
              errors.nome = "Nome do condomínio é obrigatório preencher";
            }

            if (!values.telemovel.match(/^\d\d\d\d\d\d\d\d\d$/)) {
              errors.telemovel = "Nº telemóvel inválido";
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
                  email: values.email,
                  password: values.password,
                  nif: values.nif,
                  morada: values.morada,
                  codPostal: values.codPostal,
                  condominioId,
                  userType: "condomino",
                }
              );
              console.log(res);
              Redirect();
            } catch (error) {
              console.log({ error });
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="w-4/6 mb-4">
                <label htmlFor="nome">Nome do condomino</label>
                <Field type="text" name="nome"></Field>
              </div>
              <div className="w-2/6 pl-4">
                <label htmlFor="nif">NIF</label>
                <Field
                  type="text"
                  name="nif"
                  maxLength={9}
                  size={9}
                  placeholder="123456789"
                ></Field>
              </div>
              <label htmlFor="telemovel">Nº telemóvel</label>
              <Field type="text" name="telemovel" />
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
              <div className="w-1/2 pr-4">
                <label htmlFor="andar">Andar</label>
                <Field type="text" name="andar" maxLength={1} size={1} />
              </div>
              <div className="w-1/2 pl-4 mb-6">
                <label htmlFor="fracao">Fração</label>
                <Field type="text" name="fracao" maxLength={1} size={1} />
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
                name="telemovel"
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

export default SignupCondomino;
