import { useState } from "react";

import LoginForm from "./LoginForm";
import { notify } from "@/utils/notificationToastify";

const Login = ({ loginUser, saveUser }) => {
  const [isButtonDisabled, setButtonIsButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const res = await loginUser(user);
      if(res !== undefined) {
        console.log(res.data.data)
        saveUser(res.data.data);
        notify(user, "success", `Iniciaste sesion correctamente ${res.data.data.name}`);
        return
      }
    } catch (error) {
      console.log("entro")
      notify(user, "error", error.message);
    } finally {
      setButtonIsButtonDisabled(false);
    }
  };

  const props = {
    handleInputChange,
    handleSubmit,
    user,
    isButtonDisabled,
  };

  return <LoginForm {...props} />;
};

export default Login;
