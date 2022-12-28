import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "@helpers/axiosInstance";
import { Outlet } from "react-router-dom";

function AdminFracoes() {
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
    "condominio",
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
        <section className="fracoes">
          <Link to={"criar"}>Criar fração</Link>
        </section>
      </>
    );
  }
}

export default AdminFracoes;
