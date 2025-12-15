import React from "react";
import { useNavigate } from "react-router";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center animate-fade-in">
        <div className="text-red-600 text-6xl mb-4">✗</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Canceled
        </h1>
        <p className="text-gray-600 mb-6">
          Your payment was not completed. You can try again or explore other
          contests.
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/all-contests")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
          >
            Browse Contests
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled;
