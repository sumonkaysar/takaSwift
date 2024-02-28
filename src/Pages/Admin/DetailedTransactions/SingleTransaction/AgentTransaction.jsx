import moment from "moment";

const AgentTransaction = ({ transaction }) => {
  const { _id, type, amount, income, reciever, user, senderEmail, time } = transaction;
  
  return (
    <tr>
      <td>{type}</td>
      <td>{amount} TK</td>
      <td>{income || 0} TK</td>
      <td>{senderEmail || user}</td>
      <td>{reciever}</td>
      <td>
        {moment(time).format("hh:mm a")}
        <br />
        {moment(time).format("DD MMM YY")}
      </td>
    </tr>
  )
};

export default AgentTransaction