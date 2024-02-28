import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { AuthContext } from "../../../Contexts/AuthContext";
import { server } from "../../../links";
import { toast } from "react-toastify";

const CashIn = () => {
  const { user, setUser } = useContext(AuthContext);
  const [chasInError, setCashInError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCashIn = (data) => {
    setCashInError(null);
    data.amount = Number(data.amount)
    if (user.mobile === data.mobile) {
      return setCashInError("You can't cash in to your number");
    } else if (data.amount > user.balance) {
      return setCashInError("Insufficient Balance");
    }
    data.email = user.email
    data.time = new Date().getTime()
    data.transactionId = `TAKASWIFT_${new Date().getTime()}_${Math.random().toString(36).slice(2).toUpperCase()}`;
    const cookie = Cookies.get("takaSwiftToken");
    fetch(`${server}/money/cashIn`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "authorization": `Agent ${cookie}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.message);
        if (result?.status === 200) {
          setUser(prevUser => ({...prevUser, balance: (prevUser.balance - data.amount)}));
          toast.success(result.message)
        } else {
          setCashInError(result?.error);
          toast.error(result.error)
          console.log(result?.error);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2 className="text-center mt-5 mb-5 font-bold text-white text-2xl">Send Money</h2>
      <form className="mx-auto lg:w-[800px] w-11/12" onSubmit={handleSubmit(handleCashIn)}>
        <h4 className="mb-3 text-lg">Your Current Balance: <b>{user?.balance} Taka</b></h4>
        <div className="form-control">
          <div>
            <label htmlFor="mobile" className="label">User's Mobile</label>
            <input
              {...register("mobile", { required: true })}
              type="text"
              id="mobile"
              placeholder="Mobile"
              className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
            />
            {
              errors.mobile && <span className="text-red-600 text-sm mt-1">Reciever's mobile is required</span>
            }
            <div className="mt-2">
              <label htmlFor="amount" className="label">Amount (Taka)</label>
              <div className="relative">
                <input
                  {...register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Please enter a valid amount"
                    }
                  })}
                  type="text"
                  id="amount"
                  placeholder="Amount"
                  className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                />
              </div>
              {
                errors.amount && <span className="text-red-600 text-sm mt-1">{errors.amount.message}</span>
              }
            </div>
            <div className="mt-2">
              <label htmlFor="pin" className="label">PIN</label>
              <div className="relative">
                <input
                  {...register("pin", { required: true })}
                  type="text"
                  id="pin"
                  placeholder="PIN"
                  className="input border-[#3b3b3b] w-full outline-none focus:outline-1"
                />
              </div>
              {
                errors.pin && <span className="text-red-600 text-sm mt-1">PIN is required</span>
              }
            </div>
          </div>
        </div>
        {
          chasInError && <p className="text-red-600 font-semibold text-center mt-4">
            {chasInError}
          </p>
        }
        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary hover:bg-[#3388f8] bg-[#2166fc] border-none text-white font-bold"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
};

export default CashIn