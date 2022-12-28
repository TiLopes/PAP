import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePasswordValidation } from "@helpers/passwordVerify";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupCondominioValidation } from "@helpers/signupValidation";
import "@styles/Signup.scss";

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

  const validationSchema = signupCondominioValidation;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", {
        nomeCond: data.nome,
        nomeAdmin: data.nomeAdmin,
        telemovel: data.telemovel,
        email: data.email,
        password: password.password,
        nif: data.nif,
        morada: data.morada,
        codPostal: data.codPostal,
        userType: "condominio",
      });
      console.log(res);
      Redirect();
    } catch (err) {
      console.error(err);
      setError("email", {
        type: "manual",
        message: err.response.data.errors.email,
      });

      setError("password", {
        type: "manual",
        message: err.response.data.errors.password,
      });
    }
  };

  return (
    <>
      <div className="signup min-w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Registro de condomínio</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper !w-4/6">
            <label htmlFor="nome">Nome do condomínio</label>
            <input type="text" name="nome" {...register("nome")} />
            <div className="w-full error-message">{errors.nome?.message}</div>
          </div>
          <div className="input-wrapper !w-1/4">
            <label htmlFor="nif">NIF</label>
            <input
              type="text"
              name="nif"
              maxLength={9}
              size={9}
              placeholder="123456789"
              {...register("nif")}
            />
            <div className="w-full error-message">{errors.nif?.message}</div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="nomeAdmin">Nome do administrador</label>
            <input type="text" name="nomeAdmin" {...register("nomeAdmin")} />
            <div className="w-full error-message">
              {errors.nomeAdmin?.message}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="telemovel">Nº telemóvel</label>
            <input
              type="text"
              name="telemovel"
              maxLength={9}
              {...register("telemovel")}
            />
            <div className="w-full error-message">
              {errors.telemovel?.message}
            </div>
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email do administrador</label>
            <input type="email" name="email" {...register("email")} />
            <div className="w-full error-message">{errors.email?.message}</div>
          </div>
          <div className="input-wrapper">
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
          </div>
          <div className="w-full mb-4">
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
          <div className="input-wrapper !w-4/6">
            <label htmlFor="morada">Morada</label>
            <input
              type="text"
              name="morada"
              {...register("morada")}
              placeholder="Rua da Água, 2"
            />
            <div className="w-full error-message">{errors.morada?.message}</div>
          </div>
          <div className="input-wrapper !w-1/4">
            <label htmlFor="codPostal">Cód. Postal</label>
            <input
              type="text"
              name="codPostal"
              maxLength={8}
              size={8}
              placeholder="1234-123"
              {...register("codPostal")}
            />
            <div className="w-full error-message">
              {errors.codPostal?.message}
            </div>
          </div>
          <input type="submit" className="cursor-pointer" value={"Registar"} />
        </form>
        {/* <Formik
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
          onSubmit={async (values, errors) => {
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
              console.log(res);
              Redirect();
            } catch (err) {
              console.error(err);
              console.log(err.response.data.errors.email);
              errors.email = err.response.data.errors.email;
            }
          }}
        >*/}
      </div>
    </>
  );
}

export default SignupCondominio;
