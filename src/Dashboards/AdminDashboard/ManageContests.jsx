import React from "react";
import UseAxiosSecure from "../../Hoocks/UseAxiosSecure";
import UseAuth from "../../Hoocks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Swal from "sweetalert2";

const ManageContests = () => {
  const { user, role, loading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const { data = {}, refetch } = useQuery({
    queryKey: ["contests"],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/contests");
      return res.data;
    },
  });

  const contests = data?.contests || [];

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (!user?.email || !role) {
    return null;
  }

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/contests/${id}`, {
        status,
      });

      if (res.data.modifiedCount) {
        toast.success("Successfully updated");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update status", error.code);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Contest has been deleted.",
            icon: "success",
          });
          refetch();
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 md:p-9 min-h-[70vh]">
      <h4 className="text-2xl font-bold mb-6 text-center">
        Manage Contests
      </h4>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Contest Name</th>
              <th>Creator Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest._id}
                className="hover:bg-base-200 transition-colors"
              >
                <th className="text-sm">{index + 1}</th>

                <td className="font-medium">{contest.name}</td>

                <td className="text-sm break-all">
                  {contest.creatorEmail}
                </td>

                <td className="capitalize">{contest.type}</td>

                <td>
                  <span
                    className={`badge capitalize ${
                      contest.status === "approved"
                        ? "badge-success"
                        : contest.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {contest.status || "pending"}
                  </span>
                </td>

                <td className="flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(contest._id, "approved")
                    }
                    className="btn btn-sm text-xl text-green-500"
                  >
                    <RiVerifiedBadgeFill />
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(contest._id, "rejected")
                    }
                    className="btn btn-sm text-sm text-yellow-600"
                  >
                    <ImCross />
                  </button>

                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="btn btn-sm text-xl text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="border rounded-xl p-4 shadow bg-base-100"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">
                {contest.name}
              </h3>
              <span
                className={`badge capitalize ${
                  contest.status === "approved"
                    ? "badge-success"
                    : contest.status === "rejected"
                    ? "badge-error"
                    : "badge-warning"
                }`}
              >
                {contest.status || "pending"}
              </span>
            </div>

            <p className="text-sm mb-1 break-all">
              <strong>Creator:</strong> {contest.creatorEmail}
            </p>

            <p className="text-sm mb-3 capitalize">
              <strong>Type:</strong> {contest.type}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleStatusChange(contest._id, "approved")
                }
                className="btn btn-sm btn-outline flex-1 text-green-600"
              >
                <RiVerifiedBadgeFill />
              </button>

              <button
                onClick={() =>
                  handleStatusChange(contest._id, "rejected")
                }
                className="btn btn-sm btn-outline flex-1 text-yellow-600"
              >
                <ImCross />
              </button>

              <button
                onClick={() => handleDelete(contest._id)}
                className="btn btn-sm btn-outline flex-1 text-red-600"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContests;
