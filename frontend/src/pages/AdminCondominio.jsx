import { useState } from "react";
import { useEffect } from "react";
import axios from "../helper/axiosInstance";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminCondominio.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";

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
    return (
      <HelmetProvider>
        <Helmet>
          <title>Administração condomínio</title>
          <link
            href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            rel="stylesheet"
          ></link>
        </Helmet>
        <AdminNavbar />
        <section className="home-section">
          <Outlet />
        </section>
      </HelmetProvider>
    );
  }
}

export default AdminCondominio;
