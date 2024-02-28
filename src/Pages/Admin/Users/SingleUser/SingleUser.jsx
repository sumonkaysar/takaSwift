import Cookies from "js-cookie";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from 'react-toastify';
import { server } from "../../../../links";
import { Link } from "react-router-dom";

const SingleUser = ({ user, refetch }) => {
  const { _id, firstName, lastName, email, mobile, status, balance } = user;
  const cookie = Cookies.get("takaSwiftToken");

  const handleBlock = (status) => {
    fetch(`${server}/users/block/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "authorization": `Admin ${cookie}`
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status === 200) {
          toast.success(`${firstName} ${lastName} is ${status === "Blocked" ? status.toLowerCase() : "unblocked"} successfully`)
          refetch();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <tr>
      <td><Link to={`/admin/user/${_id}/transactions`}>{firstName} {lastName}</Link></td>
      <td>
        {email}
        <br />
        {mobile}
      </td>
      <td>{balance || 0} TK</td>
      <td>
        {
          status === "Blocked" ?
            <span className="text-[#ff4646]">Blocked</span> :
            <span className="text-[#4aff68]">Good</span>
        }
      </td>
      <td>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button"><BsThreeDotsVertical /></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-slate-900 px-3 py-5">
            <li><button>Delete</button></li>
            {
              status === "Blocked" ?
                <li><button onClick={() => handleBlock("")}>Unblock</button></li> :
                <li><button onClick={() => handleBlock("Blocked")}>Block</button></li>
            }
          </ul>
        </div>
      </td>
    </tr>
  )
};

export default SingleUser