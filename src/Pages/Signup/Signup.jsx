import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
// import successIcon from "../../../assets/Icon/success.png";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { server } from "../../links";
import { AuthContext } from "../../Contexts/AuthContext";

const Signup = () => {
  const { setUser } = useContext(AuthContext);
  const [signupError, setSignupError] = useState(null);
  const [errorType, setErrorType] = useState({});
  const [pinSeen, setPinSeen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSignupError(null);
    fetch(`${server}/auth/signup`, {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        if (result?.userResult?.acknowledged) {
          Cookies.set('takaSwiftToken', result.token, { expires: 7, path: '/' });
          setUser(result.user);
        } else {
          if (result?.errorType) {
            setErrorType(result?.errorType);
          }
          setSignupError(result?.error);
          console.log(result?.error);
        }
      }).catch(error => console.log(error));
  };
  return (
    <div className="min-h-screen lg:pb-24 pb-11">
      <div className="hero-content flex justify-evenly w-screen  mx-auto">
        <div className="card w-[800px] shadow-md border-[1px] border-[#008CBA] mt-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body lg:px-7 px-4">
              <div className="">
                <h1 className="lg:text-2xl text-lg font-semibold text-[#008CBA] border-b-[1px] border-[#ddd] pb-3 text-center">Taka Swift</h1>
              </div>
              <div className="form-control">
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <label className="label">First Name</label>
                    <input
                      {...register("firstName", { required: true })}
                      type="text"
                      placeholder="First Name"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                    />
                    {errors.firstName && (
                      <span className="text-red-600">
                        First is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">Last Name</label>
                    <input
                      {...register("lastName", { required: true })}
                      type="text"
                      placeholder="Last Name"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                    />
                    {errors.lastName && (
                      <span className="text-red-600">
                        Last name is required
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      placeholder="Email"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                      onKeyUp={() => setErrorType(prev => ({...prev, email: ""}))}
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        Email is required
                      </span>
                    )}
                    {errorType.email && (
                      <span className="text-red-600">
                        {errorType.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">Mobile</label>
                    <input
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^(01)\d{9}$/,
                          message: "Please enter a valid mobile number starting with 01."
                        }
                      })}
                      type="text"
                      placeholder="Mobile (Ex: 017XXXXXXXX)"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                      onKeyUp={() => setErrorType(prev => ({...prev, mobile: ""}))}
                    />
                    {errors.mobile && (
                      <span className="text-red-600">
                        {errors.mobile.message}
                      </span>
                    )}
                    {errorType.mobile && (
                      <span className="text-red-600">
                        {errorType.mobile}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="label">NID</label>
                    <input
                      {...register("nid", {required: true})}
                      type="text"
                      placeholder="NID"
                      className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                      onKeyUp={() => setErrorType(prev => ({...prev, nid: ""}))}
                    />
                    {errors.nid && (
                      <span className="text-red-600">
                        NID is requires
                      </span>
                    )}
                    {errorType.nid && (
                      <span className="text-red-600">
                        {errorType.nid}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="label">Account Type</label>
                      <select
                        {...register("role", { required: true })}
                        className="select select-bordered w-full"
                      >
                        <option>User</option>
                        <option>Agent</option>
                      </select>
                      {errors.role && (
                        <span className="text-red-600">
                          Account Type is required
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="label">PIN</label>
                      <div className="relative">
                        <input
                          {...register("pin", {
                            required: "PIN is required",
                            pattern: {
                              value: /^\d{5}$/,
                              message: "PIN must be exactly 5 digits"
                            }
                          },
                          )}
                          type={pinSeen ? "text" : "password"}
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
                      {errors.pin && (
                        <span className="text-red-600">
                          {errors.pin.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {
                signupError && <span className="text-red-600 font-semibold text-center">
                  {signupError}
                </span>
              }
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary  hover:bg-[#3388f8] bg-[#2166fc] border-none text-white font-bold"
                >
                  Register
                </button>
              </div>
              <p className="text-center">Already have an account? <Link to={"/login"} className="text-[#70aeff] hover:text-[#7ce9fa] hover:underline">Login</Link> here
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
