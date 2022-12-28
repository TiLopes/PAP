import { Link } from "react-router-dom";
import "@styles/Frontpage.scss";

function Frontpage() {
  return (
    <div className="App flex justify-evenly items-center">
      <Link to={"/signup/condominio"}>Sign up condomínio</Link>
      <Link to={"/login/condominio"}>Login condomínio</Link>
      <Link to={"/administracao/condominio"}>Condomínio dashboard</Link>
    </div>
  );
}

export default Frontpage;
