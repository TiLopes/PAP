import "./Frontpage.scss";

function Frontpage() {
  return (
    <div className="App flex justify-evenly items-center">
      <a href={`/signup/condominio`}>Sign up condominio</a>
      <a href={`/login/condominio`}>Login condominio</a>
    </div>
  );
}

export default Frontpage;
