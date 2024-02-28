const WaitingPage = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center -mt-[82px]">
      <div className="max-w-lg bg-slate-900 w-11/12 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl text-gray-200 font-bold mb-4">Waiting for Admin Approval</h2>
        <p className="text-gray-400 mb-8">
          Your request has been submitted and is pending approval from the admin. Please be patient.
        </p>
        <div className="flex justify-center">
          <div className="spinner bg-primary-500"></div>
        </div>
      </div>
    </div>
  )
};

export default WaitingPage