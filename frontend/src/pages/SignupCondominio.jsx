import "./Signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";

function formSubmit(e) {
  e.preventDefault();
}

function SignupCondominio() {
  return (
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
        validateOnMount={false}
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
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
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
              <Field type="text" name="nif"></Field>
            </div>
            <label htmlFor="nome">Nome do administrador</label>
            <Field type="text" name="nomeAdmin"></Field>
            <label htmlFor="email">Email</label>
            <Field type="text" name="email" />
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
            <div className="w-4/6 mb-4">
              <label htmlFor="nome">Morada</label>
              <Field type="text" name="morada" />
            </div>
            <div className="w-1/4">
              <label htmlFor="nome">Cód. Postal</label>
              <Field
                type="text"
                name="codPostal"
                size={8}
                pattern="\d\d\d\d-\d\d\d"
                placeholder="1234-123"
              />
            </div>
            <ErrorMessage
              name="email"
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
  );
}

export default SignupCondominio;
