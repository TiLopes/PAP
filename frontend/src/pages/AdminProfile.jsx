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
      <>
        <h1>Profile</h1>
        <div className="profile-wrapper">
          <p>{userData.nome}</p>
          <p>{userData.nif}</p>
          <p>{userData.nomeAdmin}</p>
          <p>{userData.email}</p>
          <p>{userData.morada}</p>
          <p>{userData.codPostal}</p>
        </div>
      </>
    );
  }
}

export default AdminProfile;
