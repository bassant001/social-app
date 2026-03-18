import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import axios from "axios";
import { useNavigate } from "react-router";
import Login from './../login/Login';
import { Bounce, toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

export default function Register() {
  // LOADING
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null)
  const navigate = useNavigate();
  // ZOD Schema
  const registerSchema = zod
    .object({
      name: zod
        .string()
        .nonempty("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(13, "Username must be maximum 13 characters"),

      email: zod
        .string()
        .email("Email isn't in correct format"),

      password: zod
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must be 8+ chars with upper, lower, number & special char"
        ),

      rePassword: zod
        .string(),

      dateOfBirth: zod
        .coerce
        .date()
        .refine((date) => {
          return (
            new Date().getFullYear() - date.getFullYear() >= 18
          );
        }, "Age must be at least 18"),

      gender: zod.enum(["male", "female"], {
        errorMap: () => ({ message: "Please select gender" }),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: "Passwords do not match",
    });

  const { handleSubmit, register, formState: { errors }, } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });

  function handleRegister(values) {
    setloading(true);
    console.log("values:");
    console.log(values);
    console.log("errors:");
    console.log(errors);

    axios.post("https://route-posts.routemisr.com/users/signup", values)
      .then((res) => {
        console.log(res)
        seterror(null);
        toast.success("Account created successfully!", {
          transition: Bounce,
        });
        navigate("/login")
      })
      .catch((err) => {
        console.log(err.response?.data);
        seterror(err.response?.data?.message);
      })
      .finally(() => { setloading(false) })
  }

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      {/* <div className="bg-gradient-to-tr from-blue-100 to-blue-700 shadow-2xl p-6 rounded-3xl w-1/2"> */}
        <form onSubmit={handleSubmit(handleRegister)}  className="bg-gray-200 mx-auto w-2xl p-10 rounded-2xl">
          {/* name */}
          <div className="my-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border-2 rounded-2xl"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          {/*  birth */}
          <div className="my-5">
            <input
              type="date"
              className="w-full p-3 border-2 rounded-2xl"
              {...register("dateOfBirth")}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500">{errors.dateOfBirth.message}</p>
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

          {/* confirm password */}
          <div className="my-5">
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border-2 rounded-2xl"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <p className="text-red-500">{errors.rePassword.message}</p>
            )}
          </div>

          {/* gender */}
          <div className="my-5">
            <select
              className="w-full p-3 border-2 rounded-2xl"
              {...register("gender")}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>
          {/* button */}
          <button className="p-3 w-full bg-[#1600FF] text-white font-bold rounded-2xl cursor-pointer">
            {loading ? <BeatLoader color="white"/>: "Register"}
          </button>
          {/* error case */}
          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        </form>
      </div>
    // </div>
  );
}