import AgentTransaction from "./AgentTransaction";

const AllAgents = ({transactions}) => {

  return (
    <div className="bg-slate-800">
      <table className="table text-gray-100">
        <thead className="text-gray-400">
          <tr>
            <th>Operation</th>
            <th>Amount</th>
            <th>Income</th>
            <th>Sender</th>
            <th>Reciever</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions?.map(transaction =>
              <AgentTransaction
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

export default AllAgents