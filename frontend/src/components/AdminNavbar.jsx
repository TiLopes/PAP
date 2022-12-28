import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "@helpers/axiosInstance";
import "@styles/AdminNavbar.scss";

function AdminNavbar() {
  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [condominio, setCondominio] = useState();
  const [permission, setPermission] = useState(false);

  function Redirect() {
    const path = `/login/condominio`;
    navigate(path);
  }

  const handleToggle = () => {
    setActive(!isActive);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/showuser/me")
      .then((res) => {
        setCondominio(res.data.user);
        setPermission(true);
      })
      .catch((err) => {
        console.error(err);
        return Redirect();
      });
  }, []);

  function toggleArrow(e) {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  }

  if (permission) {
    return (
      <>
        <nav className={`sidebar ${isActive ? "" : "close"}`}>
          <div className="logo-details">
            <span className="logo_name">Administração</span>
            <i
              className="bx bx-menu cursor-pointer"
              id="btn"
              onClick={handleToggle}
            ></i>
          </div>
          <ul className="nav-links">
            <li>
              <Link to={"dashboard"}>
                <i className="bx bx-grid-alt"></i>
                <span className="link_name">Dashboard</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"profile"}>
                <i className="bx bx-user"></i>
                <span className="link_name">Profile</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Profile
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="iocn-link">
                <Link to={"fracoes"} className="link_name">
                  <i className="bx bx-chat"></i>
                  <span className="link_name">Frações</span>
                </Link>
                <i
                  className="bx bxs-chevron-down arrow"
                  onClick={toggleArrow}
                ></i>
              </div>
              <ul className="sub-menu">
                <li>
                  <Link to={"fracoes"} className="link_name">
                    Frações
                  </Link>
                </li>
                <li>
                  <Link to={"fracoes/criar"}>Criar fração</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"condomino"}>
                <i className="bx bx-user"></i>
                <span className="link_name">Condóminos</span>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Condóminos
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="profile-details">
                <div className="profile-content"></div>
                <div className="name-job">
                  <div className="profile_name">{condominio.nome}</div>
                  <div className="job">{condominio.morada}</div>
                </div>
                <i className="bx bx-log-out" onClick={logout}></i>
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default AdminNavbar;
