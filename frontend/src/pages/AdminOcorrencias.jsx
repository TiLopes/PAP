import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import { Outlet } from "react-router-dom";

export default function AdminOcorrencias() {
  let permission = false;
  const navigate = useNavigate();

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const checkPermission = async () => {
    const res = await axiosInstance.get(`/api/condominio/info`);
  };

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    "ocorrencias",
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
      <section className="ocorrencias">
        <h1>Ocorrências</h1>
        <Link to={"criar"}>Criar ocorrência</Link>
      </section>
    );
  }
}
