import React from "react";
import logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col-reverse gap-15 lg:gap-0 lg:flex-row justify-between">
      <div className="w-full lg:w-[40%] bg-amber-400 h-[80vh]"></div>
      <div className="w-full lg:w-[60%] h-[80vh] flex justify-center items-center flex-col">
        <img src={logo} alt="" className="w-[200px]" />
        <h2 className="text-5xl font-bold mt-6">Wellcome back</h2>

        <form className="w-[300px] mt-10">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
