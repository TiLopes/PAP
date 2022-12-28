import axios from "@helpers/axiosInstance";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@components/AdminNavbar";
import "@styles/AdminCondominio.scss";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { useQuery } from "react-query";

function AdminCondominio() {
  let permission = false;

  let navigate = useNavigate();

  const checkPermission = async () => {
    const res = await axios.get(`http://localhost:3000/api/condominio/info`);

    return res.data;
  };

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    ["condominio"],
    () => checkPermission,
    {
      retry: false,
      staleTime: Infinity,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return Redirect();
  }

  if (isSuccess) {
    permission = true;
  }

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
          <div className="home-content">
            <Outlet />
          </div>
        </section>
      </HelmetProvider>
    );
  }
}

export default AdminCondominio;
