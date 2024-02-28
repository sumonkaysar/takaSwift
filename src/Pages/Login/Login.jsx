import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { server } from "../../links";
import { AuthContext } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [loginError, setLoginError] = useState(null);
  const [pinSeen, setPinSeen] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    setLoginError(null);
    if (isNaN(Number(data.emailOrMobile))) {
      data.email = data.emailOrMobile;
    } else {
      data.mobile = data.emailOrMobile;
    }
    fetch(`${server}/auth/login`, {
      method: 'POST',
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.message);
        if (result?.status === 200) {
          if (result.user.status !== "Blocked") {
            Cookies.set('takaSwiftToken', result.token, { expires: 7, path: '/' });
            setUser(result.user);
            toast.success("Logged in successfully");
            console.log(result.user.role);
            switch (result.user.role) {
              case "Admin":
                navigate("/admin");
                break;
              case "Agent":
                navigate("/agent");
                break;
              default:
                navigate("/dashboard");
                break;
            }
          } else {
            toast.error("You are suspended");
            setLoginError("You are suspended");
          }
        } else {
          setLoginError(result?.error);
          console.log(result?.error);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="hero-content">
          <div className="card w-[700px] shadow-md border-[1px] border-[#008CBA]">
            <form onSubmit={handleSubmit(handleLogin)}>
              <div className="card-body lg:px-7 px-4">
                <div className="border-b-[1px] border-[#1b2f68] pb-3">
                  <h1 className="lg:text-2xl text-center text-lg font-semibold text-[#008CBA] lg:mt-0 mt-4">Welcome Back to Taka Swift</h1>
                </div>
                <div className="form-control">
                  <div>
                    <label htmlFor="emailOrMobile" className="label">Email or Mobile</label>
                    <input
                      {...register("emailOrMobile", { required: true })}
                      type="text"
                      id="emailOrMobile"
                      placeholder="Email or mobile"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                    />
                    {
                      errors.emailOrMobile && <span className="text-red-600 text-sm mt-1">Email or mobile is required</span>}
                    <div>
                      <label htmlFor="pin" className="label">PIN</label>
                      <div className="relative">
                        <input
                          {...register("pin", { required: true })}
                          type={pinSeen ? "text" : "password"}
                          id="pin"
                          placeholder="PIN"
                          className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                        />
                        {
                          !pinSeen ?
                            <FaEye onClick={() => setPinSeen(!pinSeen)} className="absolute top-4 right-3 cursor-pointer text-xl" />
                            :
                            <FaEyeSlash onClick={() => setPinSeen(!pinSeen)} className="absolute top-4 right-3 cursor-pointer text-xl" />
                        }
                      </div>
                      {
                        errors.pin && <span className="text-red-600 text-sm mt-1">PIN is required</span>
                      }
                    </div>
                  </div>
                </div>
                {
                  loginError && <span className="text-red-600 font-semibold text-center mt-1">
                    {loginError}
                  </span>
                }
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary  hover:bg-[#3388f8] bg-[#2166fc] border-none text-white font-bold"
                  >
                    Login
                  </button>
                </div>
                <p className="text-center">Don't have an account? <Link to={"/signup"} className=" text-[#70aeff] hover:text-[#7ce9fa] hover:underline">Create</Link> a new one.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
