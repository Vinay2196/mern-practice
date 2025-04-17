import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded); // 👈 Check what's printed
        setUserInfo(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to the Dashboard</h1>
      {userInfo ? (
        <>
          <p>
            Hello, <strong>{userInfo.name || userInfo.email}</strong> 🎉
          </p>
          <p>Your email is: {userInfo.email}</p>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
