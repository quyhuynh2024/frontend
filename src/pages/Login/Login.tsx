import React, { useRef } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import AuthService from "../../services/auth";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  }); */

  /*  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }; */

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    try {
      const data = await AuthService.login({
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      });
      // storing tokens after successful login
      localStorage.setItem("tokens", JSON.stringify(data));
      navigate(location?.state?.prevUrl ? location?.state?.prevUrl : "/");
      // return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Input placeholder="Email" name="email" />
      <br />
      <Input placeholder="Password" name="password" />
      <br />
      <Button type="submit" data-ripple="#0990ff" variant="outlined">
        Log in
      </Button>
    </form>
  );
}

export default Login;
