import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from 'js-cookie';
import { AuthContext } from "../../../Contexts/AuthContext";
import { server } from "../../../links";
import { toast } from "react-toastify";

const SendMoney = () => {
  const { user, setUser } = useContext(AuthContext);
  const [sendingError, setSendingError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const handleSendMoney = (data) => {
    setSendingError(null);
    data.amount = Number(data.amount)
    if (user.mobile === data.mobile) {
      return setSendingError("You can't send to your mobile number");
    } else if (data.amount < 50) {
      return setSendingError("You can't send less than 50 Taka");
    } else if ((data.amount <= 100 && data.amount > user.balance) || (data.amount > 100 && (data.amount + 5) > user.balance)) {
      return setSendingError("Insufficient Balance");
    }
    data.email = user.email
    data.time = new Date().getTime()
    data.transactionId = `TAKASWIFT_${new Date().getTime()}_${Math.random().toString(36).slice(2).toUpperCase()}`;
    const cookie = Cookies.get("takaSwiftToken");
    fetch(`${server}/money/send`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${cookie}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result.message);
        if (result?.status === 200) {
          let amount = data.amount;
          if (data.amount > 100) {
            amount = amount + 5;
          }
          setUser(prevUser => ({...prevUser, balance: (prevUser.balance - amount)}));
          toast.success(`Send money to ${data.mobile} successfully`);
          reset();
        } else {
          setSendingError(result?.error);
          console.log(result?.error);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2 className="text-center mt-5 mb-5 font-bold text-white text-2xl">Send Money</h2>
      <form className="mx-auto lg:w-[800px] w-11/12" onSubmit={handleSubmit(handleSendMoney)}>
        <h4 className="mb-3 text-lg">Your Current Balance: <b>{user?.balance} Taka</b></h4>
        <div className="form-control">
          <div>
            <label htmlFor="mobile" className="label">Reciever's Mobile</label>
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
          sendingError && <p className="text-red-600 font-semibold text-center mt-4">
            {sendingError}
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

export default SendMoney