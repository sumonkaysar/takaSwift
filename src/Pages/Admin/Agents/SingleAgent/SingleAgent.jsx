import Cookies from "js-cookie";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from 'react-toastify';
import { server } from "../../../../links";
import { Link } from "react-router-dom";

const SingleAgent = ({ agent, refetch }) => {
  const { _id, firstName, lastName, email, mobile, status, balance, income } = agent;
  const cookie = Cookies.get("takaSwiftToken");

  const handleAgent = (status, success) => {
    fetch(`${server}/agents/${_id}`, {
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
          toast.success(`${firstName} ${lastName} is ${success ? success : status.toLowerCase()} successfully`)
          refetch();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <tr>
      <td><Link to={`/admin/agent/${_id}/transactions`}>{firstName} {lastName}</Link></td>
      <td>
        {email}
        <br />
        {mobile}
      </td>
      <td>{balance || 0} TK</td>
      <td>{income || 0} TK</td>
      <td>
        {
          status === "Approved" ?
            <span className="text-[#4aff68]">Approved</span> :
            status === "Blocked" ?
              <span className="text-[#ff4646]">Blocked</span> :
              <span className="text-[#ffd664]">Not approved</span>
        }
      </td>
      <td>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div tabIndex={0} role="button"><BsThreeDotsVertical /></div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-slate-900 px-3 py-5">
            {
              status === "Approved" ?
                <li><button onClick={() => handleAgent("", "disapproved")}>Disapprove</button></li> :
                <li><button onClick={() => handleAgent("Approved")}>Approve</button></li>
            }
            <li><button>Delete</button></li>
            {
              status === "Blocked" ?
                <li><button onClick={() => handleAgent("", "unblocked")}>Unblock</button></li> :
                <li><button onClick={() => handleAgent("Blocked")}>Block</button></li>
            }
          </ul>
        </div>
      </td>
    </tr>
  )
};

export default SingleAgent