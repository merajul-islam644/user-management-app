import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSaveRegisterUser = () => {
  const [registerUser, setRegisterUser] = useState(() => {
    return JSON.parse(localStorage.getItem("registerUser")) || [];
  });
  const navigate = useNavigate();
  const addUser = (newUser) => {
    const updatedUsers = [...registerUser, newUser];
    setRegisterUser(updatedUsers);
    localStorage.setItem("registerUser", JSON.stringify(updatedUsers));
    navigate("/");
    toast.success("Registered Successfully.");
  };
  return { addUser, registerUser };
};

export const useSaveLoginUser = () => {
  const navigate = useNavigate();
  const addUser = (data) => {
    localStorage.setItem("loginUser", JSON.stringify(data));
    navigate("/homepage");
    toast.success("Login successfully");
  };
  return addUser;
};

export const useGetRegisterUser = () => {
  const [getRegisterUser, setGetRegisterUser] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("registerUser")) || [];
    setGetRegisterUser(storedUsers);
  }, []);

  return getRegisterUser;
};

export const useGetLoginUser = () => {
  const [getLoginUser, setGetLoginUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loginUser")) || {};
    setGetLoginUser(storedUser);
  }, []);

  return getLoginUser;
};
