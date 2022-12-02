import { Formik, Form, Field, ErrorMessage } from "formik";
import "./Login.scss";

function LoginCondominio() {
  return (
    <div className="login min-w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Entrar em condomínio</h1>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Introduza um email";
          }

          if (!values.password) {
            errors.password = "Introduza uma password";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          try {
            const res = await axios.post(
              "http://localhost:3000/api/auth/login",
              {
                email: values.email,
                password: values.password,
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
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <label htmlFor="password">Password</label>
            <Field type="password" name="password" />
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
            <button
              type="submit"
              disabled={isSubmitting}
              className={"mx-auto font-bold"}
            >
              Entrar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginCondominio;
