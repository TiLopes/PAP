import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "@helpers/axiosInstance";

const checkPermission = async () => {
  const res = await axios.get(`http://localhost:3000/api/showuser/me`);
};

function AdminDashboard() {
  let permission = false;

  let navigate = useNavigate();

  function Redirect() {
    let path = `/login/condominio`;
    navigate(path);
  }

  const { isError, isLoading, isSuccess, data, error } = useQuery(
    "asd",
    () => checkPermission
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return Redirect();
  }

  if (isSuccess) {
    permission = true;
    console.log("permissão ✅");
  }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/showuser/me")
  //     .then((res) => {
  //       setPermission(true);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       Redirect();
  //     });
  // }, []);

  if (permission) {
    return (
      <>
        <h1>Dashboard</h1>
      </>
    );
  }
}

export default AdminDashboard;
