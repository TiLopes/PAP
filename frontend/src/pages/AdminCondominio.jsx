import { useState } from "react";
import { useEffect } from "react";
import axios from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";

function AdminCondominio() {
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
    return <h1>aaaa</h1>;
  }
}

export default AdminCondominio;
