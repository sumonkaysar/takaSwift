import moment from "moment";

const UserTransaction = ({ transaction }) => {
  const { user, type, amount, recievedAmount, reciever, time } = transaction;
  
  return (
    <tr>
      <td>{user}</td>
      <td>{reciever}</td>
      <td>{type}</td>
      <td>{amount} TK</td>
      <td>{recievedAmount && `${recievedAmount} TK`}</td>
      <td>
        {moment(time).format("hh:mm a")}
        <br />
        {moment(time).format("DD MMM YY")}
      </td>
    </tr>
  )
};

export default UserTransaction