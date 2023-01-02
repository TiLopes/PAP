import { useNavigate } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "@styles/Login.scss";

function LoginCondomino() {
  let navigate = useNavigate();

  function Redirect() {
    let path = `/administracao/dashboard`;
    navigate(path);
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Preencha este campo"),
    password: Yup.string().required("Preencha este campo"),
  });

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
        userType: "condomino",
      });
      console.log(res);

      sessionStorage.setItem("token", res.data.accessToken.token);

      // Redirect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login min-w-full min-h-screen flex flex-col justify-center items-center">
      <h1>Entrar como condómino</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label>Email</label>
          <input type={"email"} {...register("email")}></input>
        </div>
        <div className="input-wrapper">
          <label>Password</label>
          <input type={"password"} {...register("password")}></input>
        </div>
        <input type="submit" value="Entrar" />
      </form>
    </div>
  );
}

export default LoginCondomino;
