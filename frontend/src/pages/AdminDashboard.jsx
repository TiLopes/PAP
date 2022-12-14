import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helper/axiosInstance";

function AdminDashboard() {
  const [permission, setPermission] = useState(false);

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
        console.log(res);
      })
      .catch((err) => {
        Redirect();
      });
  });

  if (permission) {
    return (
      <>
        <h1>Dashboard</h1>
      </>
    );
  }
}

export default AdminDashboard;
