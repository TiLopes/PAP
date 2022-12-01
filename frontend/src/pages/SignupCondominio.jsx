import "./Signup.scss";
function SignupCondominio() {
  return (
    <div className="signup min-w-full min-h-screen flex flex-col justify-center items-center">
      <h1>SIGN UP</h1>
      <form method="post">
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
        <input type={"submit"} value="Sign up" />
      </form>
    </div>
  );
}

export default SignupCondominio;
