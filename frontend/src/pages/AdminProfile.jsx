import { useNavigate } from "react-router-dom";
import axiosInstance from "@helpers/axiosInstance";
import "@styles/AdminProfile.scss";
import { useQuery } from "react-query";

function AdminProfile() {
  let permission = false;

  let navigate = useNavigate();

  async function getInfo() {
    const res = await axiosInstance.get("/api/showuser/me");

    return res.data;
  }

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    "conInfo",
    getInfo
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    console.log(error);
    return Redirect();
  }

  if (isSuccess) {
    permission = true;
  }

  if (permission) {
    return (
      <section className="profile">
        <h1>Profile</h1>
        <div className="profile-wrapper">
          <div className="w-4/6 mb-4">
            <label htmlFor="nome">Nome do condomínio</label>
            <input type="text" name="nome" value={data.user.nome} readOnly />
          </div>
          <div className="w-1/4 mb-4">
            <label htmlFor="nif">NIF</label>
            <input type="text" name="nif" value={data.user.nif} readOnly />
          </div>
          <label htmlFor="nomeAdmin">Nome do administrador do condomínio</label>
          <input
            type="text"
            name="nomeAdmin"
            value={data.user.nomeAdmin}
            readOnly
          />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={data.user.email} readOnly />
          <div className="w-4/6 mb-4">
            <label htmlFor="morada">Morada</label>
            <input
              type="text"
              name="morada"
              value={data.user.morada}
              readOnly
            />
          </div>
          <div className="w-1/4 mb-4">
            <label htmlFor="codPostal">Cód. Postal</label>
            <input
              type="text"
              name="codPostal"
              value={data.user.codPostal}
              readOnly
            />
          </div>
        </div>
      </section>
    );
  }
}

export default AdminProfile;
