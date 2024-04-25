import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        auth.isLoggedIn && navigate("/", { replace: true });
    }, [auth]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            await auth.createResetToken(data);
        } catch (error) {
            throw error;
        }
    };


    return (
        <>
            <div className=" mt-auto justify-center sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl transition duration-700 ease-in-out font-bold tracking-tight text-primary">
                        Recupere sua senha!
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 sm:rounded-lg sm:px-12 shadow-xl shadow-bg_shadow">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    Endereço de e-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        {...register("email")}
                                        className="transition duration-700 ease-in-out block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                    />
                                    {errors.email && (
                                        <span className="text-sm text-red-500">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 text-primary cursor-pointer bg-bg_primary hover:bg-btn transition duration-700 ease-in-out"
                                >
                                    Enviar e-mail
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}