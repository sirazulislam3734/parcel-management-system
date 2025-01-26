import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import signInImg from "../assets/signIn.json";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import Lottie from "lottie-react";

const SignIn = () => {
  const { singInUser, signInGoogle } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";
  console.log(from);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    singInUser(email, password)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "success!",
          text: "Sign In Successful!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "ERROR!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };
  const handleCaptcha = (e) => {
    e.preventDefault();
    const captcha = e.target.value;
    console.log(captcha);
    const valid = validateCaptcha(captcha);
    if (valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: "success!",
          text: "Sign Up Successful!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "ERROR!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };
  return (
    <div className="">
      <div className="min-w-screen items-center text-gray-900 flex justify-center">
        <div className="max-w-screen-xl flex-row-reverse m-0 sm:m-10 items-center shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  >
                    <div className="bg-white p-2 rounded-full">
                      <svg className="w-4" viewBox="0 0 533.5 544.3">
                        <path
                          d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                          fill="#4285f4"
                        />
                        <path
                          d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                          fill="#34a853"
                        />
                        <path
                          d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                          fill="#fbbc04"
                        />
                        <path
                          d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                          fill="#ea4335"
                        />
                      </svg>
                    </div>
                    <span className="ml-4 text-2xl px-4">Sign In with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign In with Cartesian E-mail
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form onSubmit={handleSignIn}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="input rounded-lg mb-3 font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full"
                      required
                    />
                    <div className="relative">
                      <input
                        // type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="input rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full"
                        required
                      />
                      {/* <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-8 bottom-3.5"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button> */}
                    </div>
                    <div className="my-3">
                      <label>
                        <LoadCanvasTemplate />
                      </label>
                      <input
                        onBlur={handleCaptcha}
                        type="text"
                        placeholder="type the text"
                        name="captcha"
                        className="input rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white w-full"
                      />
                    </div>
                    <input
                      disabled={disabled}
                      type="submit"
                      value="Sign In"
                      className="mt-5 tracking-wide font-semibold btn w-full py-4 rounded-lg hover:bg-green-200 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    />
                    {/* <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg> */}
                    <div className="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
                    <p>
                        Do Not have an account?
                        <Link to="/signup">
                          <button className="text-blue-400 transition hover:underline">
                            Sign Up
                          </button>
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
              {/* <img src={Img} alt="" /> */}
              <Lottie animationData={signInImg}></Lottie>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
