import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalStorage";

function Dashboard() {
  const { logout } = React.useContext(GlobalContext);
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    logout(e);

    navigate("/");
  }
  return (
    <div>
      <button
        onClick={(e) => {
          handleLogout(e);
        }}
      >
        Sair
      </button>
    </div>
  );
}
export default Dashboard;
