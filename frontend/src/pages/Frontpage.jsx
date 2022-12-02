import { Link } from "react-router-dom";
import "./Frontpage.scss";

function Frontpage() {
  return (
    <div className="App flex justify-evenly items-center">
      <Link to={`/signup/condominio`}>Sign up condominio</Link>
      <Link to={`/login/condominio`}>Login condominio</Link>
    </div>
  );
}

export default Frontpage;
