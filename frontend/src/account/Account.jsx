import { useState, useEffect, useContext } from "react";
import UserInformations from "./UserInformations.jsx";
import Sidebar from "./SideBar.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider.jsx";
const Account = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(loading);
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);
  return (
    <div className="mx-auto max-w-7xl px-4 mt-4 md:mt-16 flex flex-col md:flex-row gap-6 md:gap-8">
      <div>
        <UserInformations />
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
