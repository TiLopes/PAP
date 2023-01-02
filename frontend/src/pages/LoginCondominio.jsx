import { Formik, Form, Field, ErrorMessage } from "formik";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import "@styles/Login.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginCondominioValidation } from "@helpers/signupValidation";

function LoginCondominio() {
  let navigate = useNavigate();

  const validationSchema = loginCondominioValidation;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        email: data.email,
        password: data.password,
        userType: "condominio",
      });
      console.log(res);

      sessionStorage.setItem("token", res.data.accessToken.token);

      Redirect();
    } catch (error) {
      console.log(error);
    }
  };

  function Redirect() {
    let path = `/administracao`;
    navigate(path);
  }

  return (
    <div className="login min-w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Entrar em condomínio</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" {...register("email")} />
          <div className="error-message">{errors.email?.message}</div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" {...register("password")} />
          <div className="error-message">{errors.password?.message}</div>
        </div>

        <button type="submit" className={"mx-auto font-bold"}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginCondominio;
