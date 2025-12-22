import React from "react";
import { useOutletContext } from "react-router";

const MyWin = () => {
  const { wins } = useOutletContext();

  if (wins.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">My Wins</h2>
        <p className="text-gray-500">You have not won any contest yet.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">My Wins</h2>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-base-100 rounded-xl shadow-md overflow-hidden">
          <thead className="bg-green-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Image
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Winner Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Prize
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Contest Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Won At
              </th>
            </tr>
          </thead>

          <tbody>
            {wins.map((win) => (
              <tr
                key={win._id}
                className="border-b hover:bg-gray-50 hover:text-black transition"
              >
                <td className="py-3 px-4">
                  <img
                    src={win.image}
                    alt={win.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td className="py-3 px-4 font-medium">{win.name}</td>

                <td className="py-3 px-4 font-semibold text-green-600">
                  {win.prize}
                </td>

                <td className="py-3 px-4 text-sm  break-all max-w-[220px]">
                  {win.contestName}
                </td>

                <td className="py-3 px-4">
                  {new Date(win.wonAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {wins.map((win) => (
          <div
            key={win._id}
            className="bg-white rounded-xl shadow-md p-4 border"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={win.image}
                alt={win.name}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold text-lg">{win.name}</h3>
                <p className="text-sm text-green-600 font-semibold">
                  Prize: {win.prize}
                </p>
              </div>
            </div>

            <p className="text-sm mb-1 break-all">
              <strong>Contest ID:</strong> {win.contestId}
            </p>

            <p className="text-sm text-gray-600">
              <strong>Won At:</strong> {new Date(win.wonAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWin;
