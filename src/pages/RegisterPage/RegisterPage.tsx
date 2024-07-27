import "./RegisterPage.css"
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {ILoginDto, IRegisterDto, RegisterDto} from "../../api/client";
import { useAuth } from "../../contexts/useAuth";
import { useForm } from "react-hook-form";
import React from "react";
import config from "../../config.json";

const validationSchema = Yup.object<ILoginDto>({
    email: Yup.string()
        .required("Email is required")
        .email(),
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username cannot exceed 30 characters"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
}).required();

const RegisterPage = () => {
    const { registerUser } = useAuth();
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm<IRegisterDto>({ resolver: yupResolver(validationSchema) });

    const handleLogin = (form: IRegisterDto) => {
        registerUser(new RegisterDto(form));
    }

    return (
        <section className="bg-black flex flex-col font-mono text-white justify-center items-center h-screen home">
            <div className="flex items-center justify-center px-6 py-8 mx-auto">
                <div
                    className="w-full bg-black rounded-lg border">
                    <div className="flex flex-col space-y-5 p-6">
                        <h1 className="text-3xl font-bold px-32 pb-10">
                            Registration
                        </h1>
                        <form className="space-y-8" autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                    placeholder="sample@name.com"
                                    {...register("email")}
                                />
                                {errors.email ? <p className="text-white">{errors.email.message}</p> : ""}
                            </div>
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block mb-2"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                    placeholder="Your login here..."
                                    {...register("username")}
                                />
                                {errors.username ? <p className="text-white">{errors.username.message}</p> : ""}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="bg-gray-100 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 block w-full p-2.5"
                                    placeholder="••••••••••"
                                    {...register("password")}
                                />
                                {errors.password ? <p className="text-white">{errors.password.message}</p> : ""}
                            </div>
                            <button
                                type="submit"
                                className="text-black bg-white font-medium rounded-lg text-sm text-center button-white"
                            >
                                Submit
                            </button>
                            <div className="flex justify-around">
                                <a href={config.github_auth}
                                   className="flex items-center text-sm font-light text-gray-500 dark:text-gray-400 hover:underline">
                                    Log in with GitHub
                                    <img src="social.png" className="h-10 w-10 mr-2 ml-4"/>
                                </a>
                                <a href="https://codewars.com"
                                   className="flex items-center text-sm font-light text-gray-500 dark:text-gray-400 hover:underline">
                                    Log in with CodeWars
                                    <img src="codewars.png" className="h-14 w-14 mr-2 ml-2"/>
                                </a>
                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Log in
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
