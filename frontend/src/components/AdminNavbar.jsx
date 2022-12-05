import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helper/axiosInstance";
import "./AdminNavbar.scss";

function AdminNavbar() {
  const [isActive, setActive] = useState("false");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/showuser/me")
      .then((res) => {
        setUserData(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (userData) {
    return (
      <nav id="sidebar" className={isActive ? "open" : ""}>
        <div className="logo-details">
          <div className="logo_name">Administração</div>
          <i className="bx bx-menu" id="btn" onClick={handleToggle}></i>
        </div>
        <ul className="nav-list">
          <li>
            <Link to={"dashboard"}>
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </Link>
            <span className="tooltip">Dashboard</span>
          </li>
          <li>
            <Link to={"profile"}>
              <i className="bx bx-user"></i>
              <span className="links_name">Profile</span>
            </Link>
            <span className="tooltip">Profile</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-chat"></i>
              <span className="links_name">Messages</span>
            </a>
            <span className="tooltip">Messages</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="links_name">Analytics</span>
            </a>
            <span className="tooltip">Analytics</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-folder"></i>
              <span className="links_name">File Manager</span>
            </a>
            <span className="tooltip">Files</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cart-alt"></i>
              <span className="links_name">Order</span>
            </a>
            <span className="tooltip">Order</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-heart"></i>
              <span className="links_name">Saved</span>
            </a>
            <span className="tooltip">Saved</span>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-cog"></i>
              <span className="links_name">Setting</span>
            </a>
            <span className="tooltip">Setting</span>
          </li>
          <li className="profile">
            <div className="profile-details">
              {/* <img src="profile.jpg" alt="profileImg" /> */}
              <div className="name_job">
                <div className="name">{userData.nome}</div>
                <div className="job">{userData.morada}</div>
              </div>
            </div>
            <i
              className={"bx bx-log-out cursor-pointer"}
              id="log_out"
              onClick={logout}
            ></i>
          </li>
        </ul>
      </nav>
    );
  }
}

export default AdminNavbar;
