import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "@helpers/axiosInstance";
import { Outlet } from "react-router-dom";

function AdminCondomino() {
  let permission = false;
  const navigate = useNavigate();

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const checkPermission = async () => {
    const res = await axios.get(`http://localhost:3000/api/condominio/info`);
  };

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    "condomino",
    () => checkPermission
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isSuccess) {
    permission = true;
  }

  if (isError) {
    return Redirect();
  }

  if (permission) {
    return (
      <>
        <section className="condominos">
          <Link to={"criar"}>Criar condomino</Link>
        </section>
      </>
    );
  }
}

export default AdminCondomino;
