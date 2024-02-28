import UserTransaction from "./UserTransaction";

const AllUsers = ({ transactions }) => {

  return (
    <div className="bg-slate-800">
      <table className="table text-gray-100">
        <thead className="text-gray-400">
          <tr>
            <th>Sender</th>
            <th>Reciever</th>
            <th>Operation</th>
            <th>Amount</th>
            <th>Recieved</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions?.map(transaction =>
              <UserTransaction
                key={transaction._id}
                transaction={transaction}
              />
            )
          }
        </tbody>
      </table>
    </div>
  )
};

export default AllUsers