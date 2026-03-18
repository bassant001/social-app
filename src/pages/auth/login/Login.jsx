import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import axios from "axios";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { createdContext } from "../../../components/context/authContext";
import BeatLoader from "react-spinners/esm/BeatLoader";

export default function Login() {
  // LOADING
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate= useNavigate();

  //auth tk
  const {setAuthUserToken} = useContext(createdContext)

  // ZOD Schema
  const registerSchema = zod
    .object({
      email: zod
        .string()
        .email("Email isn't in correct format"),

      password: zod
        .string(),
    })

  const { handleSubmit, register, formState: { errors }, } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  function handleLogin(values) {
    setloading(true);
    console.log("values:");
    console.log(values);
    console.log("errors:");
    console.log(errors);

   
    axios.post("https://route-posts.routemisr.com/users/signin", values)
      .then((res) => { 
        setAuthUserToken (res.data.data.token);
        localStorage.setItem('tkn', res.data.data.token);
        console.log(res)
        seterror(null);
         toast.success("Logged in successfully!", {
          transition: Bounce,
        });
        navigate("/")
       })
      .catch((err) => {
        setAuthUserToken();
        console.log(err.response?.data);
        seterror(err.response?.data?.message);
        toast.error(err.response?.data?.message)
      })
      .finally(() => { setloading(false) })
  }

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">

        <form onSubmit={handleSubmit(handleLogin)} className="bg-gray-200 mx-auto w-2xl p-10 rounded-2xl">
          {/* email */}
          <div className="my-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border-2 rounded-2xl"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* password */}
          <div className="my-5">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border-2 rounded-2xl"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {/* button */}
          <button className="p-3 w-full bg-[#1600FF] font-bold rounded-4xl cursor-pointer text-white">
            {loading ?  <BeatLoader color="white"/>: "Login"}
          </button>
          {/* error case */}
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>
      </div>

  );
}