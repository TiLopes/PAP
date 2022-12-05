import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helper/axiosInstance";
import "./AdminProfile.scss";

function AdminProfile() {
  const [permission, setPermission] = useState(false);
  const [userData, setUserData] = useState(null);

  let navigate = useNavigate();

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/showuser/me")
      .then((res) => {
        setPermission(true);
        setUserData(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        Redirect();
      });
  }, []);

  if (permission) {
    return (
      <section className="profile">
        <h1>Profile</h1>
        <div className="profile-wrapper">
          <div className="w-4/6 mb-4">
            <label htmlFor="nome">Nome do condomínio</label>
            <input type="text" name="nome" value={userData.nome} readOnly />
          </div>
          <div className="w-1/4 mb-4">
            <label htmlFor="nif">NIF</label>
            <input type="text" name="nif" value={userData.nif} readOnly />
          </div>
          <label htmlFor="nomeAdmin">Nome do administrador do condomínio</label>
          <input
            type="text"
            name="nomeAdmin"
            value={userData.nomeAdmin}
            readOnly
          />
          <label htmlFor="email">Email</label>
          <input type="text" name="email" value={userData.email} readOnly />
          <div className="w-4/6 mb-4">
            <label htmlFor="morada">Morada</label>
            <input type="text" name="morada" value={userData.morada} readOnly />
          </div>
          <div className="w-1/4 mb-4">
            <label htmlFor="codPostal">Cód. Postal</label>
            <input
              type="text"
              name="codPostal"
              value={userData.codPostal}
              readOnly
            />
          </div>
        </div>
      </section>
    );
  }
}

export default AdminProfile;
