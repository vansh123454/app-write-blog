import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwriteServices/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
 
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService
      .logout() // it return a promise
      .then(() => {
        dispatch(logout()); // it will maintain the state updated
      })
      .catch((error) => {
        console.log("Error while logout: ", error);
      });
  };
  return (
    <button
      onClick={handleLogout}
      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200 ease-in-out cursor-pointer"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
